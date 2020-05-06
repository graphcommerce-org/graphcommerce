/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()

const IntlPolyfill = require('intl')

Intl.NumberFormat = IntlPolyfill.NumberFormat
Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat
if (process.versions.node.split('.')[0] > 12) {
  console.warn("'intl' polyfill isn't required anymore")
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const withImages = require('next-images')
const withPWA = require('next-pwa')

module.exports = withPWA(
  withImages(
    withBundleAnalyzer({
      env: {
        GRAPHQL: process.env.GRAPHQL,
        GRAPHQL_BEARER: process.env.GRAPHQL_BEARER,
        GRAPHQL_LEGACY: process.env.GRAPHQL_LEGACY,
        GRAPHQL_LEGACY_BEARER: process.env.GRAPHQL_LEGACY_BEARER,
      },
      experimental: {
        modern: true,
        rewrites() {
          return [{ source: '/sitemap.xml', destination: '/api/sitemap' }]
        },
        reactRefresh: true,
      },
      pwa: {
        dest: 'public',
        disable: process.env.NODE_ENV !== 'production',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/media\.(?:graphcms)\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'media-graphcms',
              expiration: {
                maxEntries: 1000,
                maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
              },
            },
          },
          {
            urlPattern: /\.graphcms\.com\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-graphcms',
              expiration: {
                maxEntries: 1000,
                maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
              },
            },
          },
          {
            urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-font-assets',
              expiration: {
                maxEntries: 4,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
              },
            },
          },
          {
            urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-image-assets',
              expiration: {
                maxEntries: 64,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              },
            },
          },
          {
            urlPattern: /\.(?:js)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-js-assets',
              expiration: {
                maxEntries: 16,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              },
            },
          },
          {
            urlPattern: /\.(?:css|less)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-style-assets',
              expiration: {
                maxEntries: 16,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              },
            },
          },
          {
            urlPattern: /\.(?:json|xml|csv)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'static-data-assets',
              expiration: {
                maxEntries: 16,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              },
            },
          },
          {
            urlPattern: /.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'others',
              expiration: {
                maxEntries: 16,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
              },
            },
          },
        ],
      },
    }),
  ),
)
