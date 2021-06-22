/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const { PerformanceObserver, performance } = require('perf_hooks')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

require('dotenv').config()

const withYarn1Workspaces = require('@reachdigital/next-config').withYarn1Workspaces()

const withImages = require('next-images')
const withPWA = require('next-pwa')

const obs = new PerformanceObserver((entryList) => {
  entryList.getEntries().forEach((item) => {
    console.log(`${item.name}: ${Math.round(item.duration)}ms`)
  })
  performance.clearMarks()
})
obs.observe({ entryTypes: ['measure'] })

/** @type {import('next/dist/next-server/server/config').NextConfig} */
const nextConfig = {
  webpack5: true,
  webpackStats: process.env.ANALYZE === 'true',
  rewrites() {
    return [{ source: '/sitemap.xml', destination: '/api/sitemap' }]
  },
  experimental: {
    optimizeImages: true,
    optimizeFonts: true,
    scrollRestoration: true,
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
  inlineImageLimit: false,
  productionBrowserSourceMaps: true,
}

module.exports = withBundleAnalyzer(withPWA(withYarn1Workspaces(nextConfig)))
