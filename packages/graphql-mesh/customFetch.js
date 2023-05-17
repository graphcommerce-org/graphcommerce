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

  /** @type {string | undefined} */
  const xFetch = options.headers?.['X-Fetch'] ?? ''
  const [cacheRaw, revalidateRaw, ...tagsRaw] = xFetch.split(' ')
  const cache = cacheRaw || undefined
  const revalidate = revalidateRaw ? parseInt(revalidateRaw, 10) : undefined
  const tags = tagsRaw.filter(Boolean).length > 0 ? tagsRaw : undefined

  return fetcher(url, {
    ...options,
    headers,
    retries: 6,
    retryDelay: (attempt) => 2 ** attempt * 200, // 200, 400, 800, 1600, 3200, 6400
    retryOn: [429],
    cache,
    next: { revalidate, tags },
  })
}
