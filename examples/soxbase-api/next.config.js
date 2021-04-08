/* eslint-disable @typescript-eslint/no-var-requires */
const withGraphCommerce = require('@reachdigital/next-config').withGraphCommerce()

const nextConfig = {
  future: {
    webpack5: true,
  },
  // https://nextjs.org/docs/api-reference/next.config.js/configuring-onDemandEntries
  onDemandEntries: {
    maxInactiveAge: 10 * 60 * 1000, // 10 minutes
  },
}

module.exports = withGraphCommerce(nextConfig)
