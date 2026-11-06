const withGraphCommerce = require('@graphcommerce/next-config').withYarn1Workspaces()

/** @type {import('next/dist/server/config-shared').NextConfig} */
const nextConfig = {
  images: {
    domains: ['backend.reachdigital.dev'],
  },
}

module.exports = withGraphCommerce(nextConfig)
