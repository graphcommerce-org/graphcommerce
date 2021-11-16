/* eslint-disable @typescript-eslint/no-var-requires */
const withYarn1Workspaces = require('@graphcommerce/next-config').withYarn1Scopes()
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
})

const nextConfig = {
  // https://nextjs.org/docs/api-reference/next.config.js/configuring-onDemandEntries
  onDemandEntries: {
    maxInactiveAge: 10 * 60 * 1000, // 10 minutes
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['tsx', 'mdx'],
}

module.exports = withYarn1Workspaces(withMDX(nextConfig))
