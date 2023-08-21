/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: `${__dirname}/.env` })

const PWA = require('@ducanh2912/next-pwa')
const { withGraphCommerce, runtimeCachingOptimizations } = require('@graphcommerce/next-config')

// eslint-disable-next-line import/order
const withPWA = PWA.default({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: PWA.runtimeCaching.concat(runtimeCachingOptimizations),
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 10,
    pagesBufferLength: 10,
  },
  optimizeFonts: false,
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  productionBrowserSourceMaps: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    appDir: false,
  },
}

module.exports = withGraphCommerce(withPWA(nextConfig), __dirname)
