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
 * @param {RequestInfo | URL} url
 * @param {import('fetch-retry').RequestInitWithRetry | undefined} options
 * @returns {Promise<Response>}
 * @public
 */
export const fetch = (
  url: RequestInfo | URL,
  options: RequestInitWithRetry | undefined,
): Promise<Response> => {
  const headers = Object.fromEntries(
    Object.entries(options?.headers ?? {}).filter(([, value]) => value !== ''),
  )

  return fetcher(url, {
    ...options,
    headers,
    retries: 6,
    retryDelay: (attempt) => 2 ** attempt * 200, // 200, 400, 800, 1600, 3200, 6400
    retryOn: [429],
  })
}

/** @public @alias */
export default fetch
