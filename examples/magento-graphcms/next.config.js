/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: `${__dirname}/.env` })

const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  extendDefaultRuntimeCaching: true,
  workboxOptions: {
    runtimeCaching: [
      {
        urlPattern: /\/_next\/image?url=.*$/i,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'next-image',
          expiration: {
            maxEntries: 5,
            maxAgeSeconds: 48 * 60 * 60, // 48 hours
            matchOptions: { ignoreVary: true },
          },
        },
      },
    ],
  },
})

const { withGraphCommerce, runtimeCachingOptimizations } = require('@graphcommerce/next-config')

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
