import { fetch as fetchBase } from '@whatwg-node/fetch'
import fetchRetry, { RequestInitWithRetry } from 'fetch-retry'

type RetryOptions = Pick<RequestInitWithRetry, 'retries' | 'retryDelay' | 'retryOn'>

export default fetchRetry(fetchBase, {
  retries: 6,
  retryDelay: (attempt) => 2 ** attempt * 200, // 200, 400, 800, 1600, 3200, 6400
  retryOn: [429],
} as RetryOptions)
