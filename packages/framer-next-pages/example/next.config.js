/* eslint-disable @typescript-eslint/no-var-requires */

const withGraphCommerce = require('@reachdigital/next-config').withGraphCommerce()

module.exports = withGraphCommerce({
  experimental: {
    scrollRestoration: true,
  },
  future: {
    webpack5: true,
  },
})
