import fetchRetry from 'fetch-retry'
import type { RequestInitWithRetry } from 'fetch-retry'

const fetcher = fetchRetry(
  /**
   * Always use the fetch that `@whatwg-node/fetch` exports, never `globalThis.fetch` directly. When
   * `@whatwg-node/fetch` detects a Next.js runtime it re-exports the native fetch primitives (so
   * inside Next this IS `globalThis.fetch`/undici, keeping SSL handshakes alive), but when that
   * detection fails — `next dev` (turbopack) evaluates it while loading `next.config.ts` (via
   * `@graphql-codegen/cli`), before any `__NEXT` global exists — it exports its ponyfills instead.
   * In that case `@graphql-tools/executor-http` builds multipart upload bodies with the ponyfill
   * `FormData`, which undici doesn't recognize and stringifies to the literal `[object Object]`
   * (Magento: "Unable to parse the request."). The fetch implementation must therefore always come
   * from the same family as the `FormData`/`File` classes executor-http uses.
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-var-requires
  require('@whatwg-node/fetch').fetch,
)

/**
 * Optionally reroute server-side Magento traffic to an internal endpoint.
 *
 * When the runtime environment sets `GC_MAGENTO_ENDPOINT_SERVER` (e.g.
 * `http://varnish.magento-namespace.svc.cluster.local`), every request whose URL starts with the
 * origin of `GC_MAGENTO_ENDPOINT` is rewritten to that origin. All Magento traffic the mesh
 * performs (GraphQL and REST) then stays on the internal network — e.g. within a Kubernetes cluster
 * — instead of hairpinning over the public load balancer, while the public endpoint keeps serving
 * the browser-facing concerns (media URLs, image optimization).
 *
 * - Both variables are read from `process.env` at request time: this module also runs outside the
 *   Next.js bundler (the mesh CLI imports it during `gc-mesh build`), so it cannot rely on
 *   build-inlined configuration.
 * - Set `GC_MAGENTO_ENDPOINT_SERVER` in the runtime environment only (e.g. a Kubernetes ConfigMap),
 *   never in the build environment: schema introspection and static generation run where the
 *   internal endpoint is not reachable. Unset, this is a no-op.
 * - The rewrite adds `X-Forwarded-Proto: https` — the internal path bypasses the TLS-terminating
 *   proxy that normally adds it, and without it Magento considers the request insecure and
 *   generates http:// URLs in responses.
 */
function toServerEndpoint(
  url: RequestInfo | URL,
  options: RequestInitWithRetry | undefined,
): [RequestInfo | URL, RequestInitWithRetry | undefined] {
  const serverEndpoint = process.env.GC_MAGENTO_ENDPOINT_SERVER
  const publicEndpoint = process.env.GC_MAGENTO_ENDPOINT
  if (!serverEndpoint || !publicEndpoint) return [url, options]
  if (typeof url !== 'string' && !(url instanceof URL)) return [url, options]

  const publicOrigin = new URL(publicEndpoint).origin
  const target = url.toString()
  if (!target.startsWith(publicOrigin)) return [url, options]

  return [
    new URL(serverEndpoint).origin + target.slice(publicOrigin.length),
    { ...options, headers: { ...options?.headers, 'x-forwarded-proto': 'https' } },
  ]
}

/**
 * @param {RequestInfo | URL} url
 * @param {import('fetch-retry').RequestInitWithRetry | undefined} options
 * @returns {Promise<Response>}
 * @public
 */
export const fetch = (
  url: RequestInfo | URL,
  options: RequestInitWithRetry | undefined,
): Promise<Response> => {
  const [serverUrl, serverOptions] = toServerEndpoint(url, options)

  const headers = Object.fromEntries(
    Object.entries(serverOptions?.headers ?? {}).filter(([, value]) => value !== ''),
  )

  return fetcher(serverUrl, {
    ...serverOptions,
    headers,
    retries: 6,
    retryDelay: (attempt) => 2 ** attempt * 200, // 200, 400, 800, 1600, 3200, 6400
    retryOn: [429],
  })
}

/** @public @alias */
export default fetch
