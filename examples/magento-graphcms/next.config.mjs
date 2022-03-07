/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
import perf_hooks from 'perf_hooks'
import { withMagentoConfig } from '@graphcommerce/magento-store/storeConfig.mjs'
import { withYarn1Scopes } from '@graphcommerce/next-config'
import dotenv from 'dotenv'
import withPWA from 'next-pwa'

const { PerformanceObserver, performance } = perf_hooks

dotenv.config()
await withMagentoConfig()

const obs = new PerformanceObserver((entryList) => {
  entryList.getEntries().forEach((item) => {
    console.log(`${item.name}: ${Math.round(item.duration)}ms`)
  })
  performance.clearMarks()
})
obs.observe({ entryTypes: ['measure'] })

if (!process.env.GRAPHCMS_URL || !process.env.MAGENTO_ENDPOINT) {
  throw Error('Please specify GRAPHCMS_URL and MAGENTO_ENDPOINT in your .env')
}

if (
  !process.env.NEXT_PUBLIC_LOCALE_STORES ||
  !Object.keys(JSON.parse(process.env.NEXT_PUBLIC_LOCALE_STORES)).length > 0
) {
  throw Error('Please specify NEXT_PUBLIC_LOCALE_STORES in your .env')
}

if (!process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT) {
  throw Error('Please specify NEXT_PUBLIC_GRAPHQL_ENDPOINT in your .env')
}

console.log(process.env)

/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites() {
    return [{ source: '/sitemap.xml', destination: '/api/sitemap' }]
  },
  experimental: {
    scrollRestoration: true,
    disableOptimizedLoading: true,
    esmExternals: false,
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  images: {
    domains: (process.env.IMAGE_DOMAINS ?? '').split(',').map((s) => s.trim()),
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  i18n: {
    locales: Object.keys(JSON.parse(process.env.NEXT_PUBLIC_LOCALE_STORES)),
    defaultLocale: Object.keys(JSON.parse(process.env.NEXT_PUBLIC_LOCALE_STORES))[0],
  },
  productionBrowserSourceMaps: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.optimization.providedExports = true
    return config
  },
}

const res = withPWA(withYarn1Scopes()(nextConfig))

export default res
