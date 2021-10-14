/* eslint-disable @typescript-eslint/no-var-requires */
const withYarn1Workspaces = require('@graphcommerce/next-config').withYarn1Scopes()

if (!process.env.GRAPHCMS_URL || !process.env.GRAPHCMS_BEARER || !process.env.MAGENTO_ENDPOINT) {
  throw Error('Please specificy GRAPHCMS_URL, GRAPHCMS_BEARER and MAGENTO_ENDPOINT in your .env')
}

/** @type {import('next/dist/server/config-shared').NextConfig} */
const nextConfig = {
  // https://nextjs.org/docs/api-reference/next.config.js/configuring-onDemandEntries
  onDemandEntries: {
    maxInactiveAge: 10 * 60 * 1000, // 10 minutes
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: { esmExternals: false },
  // eslint-disable-next-line @typescript-eslint/require-await
  redirects: async () => {
    return [{ source: '/', destination: '/api/graphql', permanent: false }]
  },
}

module.exports = withYarn1Workspaces(nextConfig)
