/* eslint-disable @typescript-eslint/no-var-requires */
const withYarn1Workspaces = require('@graphcommerce/next-config').withYarn1Scopes()

/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://nextjs.org/docs/api-reference/next.config.js/configuring-onDemandEntries
  onDemandEntries: {
    maxInactiveAge: 10 * 60 * 1000, // 10 minutes
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    scrollRestoration: true,
  },
}

module.exports = withYarn1Workspaces(nextConfig)
