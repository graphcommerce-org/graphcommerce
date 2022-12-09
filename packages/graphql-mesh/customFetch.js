const { fetch } = require('@whatwg-node/fetch')
const fetchRetry = require('fetch-retry')

module.exports = fetchRetry(fetch, {
  retries: 6,
  retryDelay: (attempt) => 2 ** attempt * 200, // 200, 400, 800, 1600, 3200, 6400
  retryOn: [429],
})
