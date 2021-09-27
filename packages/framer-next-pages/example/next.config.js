/* eslint-disable @typescript-eslint/no-var-requires */

const withGraphCommerce = require('@graphcommerce/next-config').withYarn1Workspaces()

module.exports = withGraphCommerce({
  experimental: {
    scrollRestoration: true,
  },
})
