/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-var-requires */
const fetchRetry = require('fetch-retry')

/** @type {fetchRetry.default} */
const fetcher = fetchRetry(process.env.NEXT_RUNTIME ? fetch : require('@whatwg-node/fetch').fetch)

/**
 * @param {RequestInfo | URL} url
 * @param {import('fetch-retry').RequestInitWithRetry | undefined} options
 * @returns {Promise<Response>}
 * @public
 */
module.exports = (url, options) => {
  /** @type {RequestInit['headers']} */
  const headers = Object.fromEntries(
    Object.entries(options?.headers ?? {}).filter(([_, value]) => value !== ''),
  )

  return fetcher(url, {
    ...options,
    headers,
    retries: 6,
    retryDelay: (attempt) => 2 ** attempt * 200, // 200, 400, 800, 1600, 3200, 6400
    retryOn: [429],
  })
}
