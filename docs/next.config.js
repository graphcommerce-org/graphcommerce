/* eslint-disable @typescript-eslint/no-var-requires */
const withYarn1Workspaces = require('@reachdigital/next-config').withYarn1Workspaces()

const nextConfig = {
  // https://nextjs.org/docs/api-reference/next.config.js/configuring-onDemandEntries
  onDemandEntries: {
    maxInactiveAge: 10 * 60 * 1000, // 10 minutes
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = withYarn1Workspaces(nextConfig)
