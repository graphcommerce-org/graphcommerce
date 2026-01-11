import dotenv from 'dotenv'
import type { NextConfig } from 'next'

dotenv.config({ quiet: true })

/**
 * Next.js App Router configuration Note: We don't use withGraphCommerce here because it adds i18n
 * config which is incompatible with App Router. Instead, we use the [store] dynamic segment.
 */
const nextConfig: NextConfig = {
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 10,
    pagesBufferLength: 10,
  },
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [52, 75],
    remotePatterns: [
      { hostname: 'configurator.reachdigital.dev' },
      { hostname: '**.graphassets.com' },
      { hostname: '*.graphcommerce.org' },
    ],
  },
  experimental: {
    scrollRestoration: true,
  },
  serverExternalPackages: [
    '@whatwg-node/cookie-store',
    '@whatwg-node/disposablestack',
    '@whatwg-node/events',
    '@whatwg-node/fetch',
    '@whatwg-node/node-fetch',
    '@whatwg-node/promise-helpers',
    '@whatwg-node/server',
    '@whatwg-node/server-plugin-cookies',
  ],
  turbopack: {
    rules: {
      '*.yaml': { loaders: [{ loader: 'js-yaml-loader', options: {} }], as: '*.js' },
      '*.yml': { loaders: [{ loader: 'js-yaml-loader', options: {} }], as: '*.js' },
      '*.po': { loaders: [{ loader: '@lingui/loader', options: {} }], as: '*.js' },
    },
  },
}

export default nextConfig
