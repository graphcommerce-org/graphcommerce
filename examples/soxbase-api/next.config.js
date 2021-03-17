/* eslint-disable @typescript-eslint/no-var-requires */
const withTranspile = require('next-transpile-modules')(['@reachdigital/graphql-mesh'], {
  unstable_webpack5: false,
})

const nextConfig = {
  // https://nextjs.org/docs/api-reference/next.config.js/configuring-onDemandEntries
  onDemandEntries: {
    maxInactiveAge: 10 * 60 * 1000, // 10 minutes
  },
}

module.exports = withTranspile(nextConfig)
