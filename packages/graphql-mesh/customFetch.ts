import fetchRetry from 'fetch-retry'
import type { RequestInitWithRetry } from 'fetch-retry'

const fetcher = fetchRetry(
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, no-underscore-dangle, @typescript-eslint/no-var-requires
  process.env.__NEXT_PROCESSED_ENV ? globalThis.fetch : require('@whatwg-node/fetch').fetch,
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
