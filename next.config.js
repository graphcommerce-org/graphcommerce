require('dotenv').config()

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withFonts = require('next-fonts')
const withImages = require('next-images')

module.exports = withImages(
  withFonts(
    withBundleAnalyzer({
      env: {
        GRAPHQL: process.env.GRAPHQL,
        GRAPHQL_BEARER: process.env.GRAPHQL_BEARER,
        GRAPHQL_LEGACY: process.env.GRAPHQL_LEGACY,
        GRAPHQL_LEGACY_BEARER: process.env.GRAPHQL_LEGACY_BEARER,
      },
      experimental: {
        rewrites() {
          return [{ source: '/sitemap.xml', destination: '/api/sitemap' }]
        },
      },
    }),
  ),
)
