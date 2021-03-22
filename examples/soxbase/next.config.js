/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const { PerformanceObserver, performance } = require('perf_hooks')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

require('dotenv').config()

const withImages = require('next-images')
const withPWA = require('next-pwa')
const withTM = require('next-transpile-modules')(
  [
    '@reachdigital/graphcms-ui',
    '@reachdigital/magento-app-shell',
    '@reachdigital/magento-cart',
    '@reachdigital/magento-category',
    '@reachdigital/magento-cms',
    '@reachdigital/magento-customer',
    '@reachdigital/magento-graphql',
    '@reachdigital/magento-payment-braintree',
    '@reachdigital/magento-payment-klarna',
    '@reachdigital/magento-product',
    '@reachdigital/magento-product-bundle',
    '@reachdigital/magento-product-configurable',
    '@reachdigital/magento-product-downloadable',
    '@reachdigital/magento-product-simple',
    '@reachdigital/magento-product-types',
    '@reachdigital/magento-product-virtual',
    '@reachdigital/magento-search',
    '@reachdigital/magento-store',
    '@reachdigital/next-ui',
    '@reachdigital/react-hook-form',
  ],
  { unstable_webpack5: false },
)

const obs = new PerformanceObserver((entryList) => {
  entryList.getEntries().forEach((item) => {
    console.log(`${item.name}: ${Math.round(item.duration)}ms`)
  })
  performance.clearMarks()
})
obs.observe({ entryTypes: ['measure'] })

const nextConfig = {
  webpackStats: process.env.ANALYZE === 'true',
  rewrites() {
    return [{ source: '/sitemap.xml', destination: '/api/sitemap' }]
  },
  experimental: {
    optimizeImages: true,
    optimizeFonts: true,
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  images: {
    domains: (process.env.IMAGE_DOMAINS ?? '').split(',').map((s) => s.trim()),
    imageSizes: [16, 32, 64, 128, 256, 384],
  },
  i18n: {
    locales: Object.keys(JSON.parse(process.env.NEXT_PUBLIC_LOCALE_STORES)),
    defaultLocale: Object.keys(JSON.parse(process.env.NEXT_PUBLIC_LOCALE_STORES))[0],
  },
}

module.exports = withBundleAnalyzer(withPWA(withImages(withTM(nextConfig))))
