/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: `${__dirname}/.env` })

const { withGraphCommerce } = require('@graphcommerce/next-config')
const cache = require('next-pwa/cache')

// eslint-disable-next-line import/order
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /\/_next\/data\/.+\/.+\.json$/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'next-data',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
      },
    },
    ...cache,
  ],
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 10,
    pagesBufferLength: 10,
  },
  experimental: {
    scrollRestoration: true,
  },
  optimizeFonts: false,
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  productionBrowserSourceMaps: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // eslint-disable-next-line @typescript-eslint/require-await
  headers: async () => [
    {
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, no-cache, no-store, max-age=0, must-revalidate',
        },
        {
          key: 'CDN-Cache-Control',
          value: 'public, max-age=31536000, stale-while-revalidate',
        },
      ],

      source: '/:path*',
    },
    {
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
        {
          key: 'CDN-Cache-Control',
          value: 'public, max-age=31536000, stale-while-revalidate',
        },
      ],

      source:
        '/:path(.+\\.(?:ico|png|svg|jpg|jpeg|gif|webp|json|js|css|mp3|mp4|ttf|ttc|otf|woff|woff2)$)',
    },
    {
      headers: [
        {
          key: 'Cache-Control',
          value: 'private, no-cache, no-store, max-age=0, must-revalidate',
        },
      ],

      source: '/_next/data/:path*',
    },
    {
      headers: [
        {
          key: 'Cache-Control',
          value: 'private, no-cache, no-store, max-age=0, must-revalidate',
        },
      ],

      source: '/_next/:path(.+\\.(?:json)$)',
    },
  ],
}

module.exports = withGraphCommerce(withPWA(nextConfig), __dirname)
