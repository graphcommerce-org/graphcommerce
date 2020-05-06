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
      },
    }),
  ),
)
