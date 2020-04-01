require('dotenv').config()

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const withFonts = require('next-fonts')

module.exports = withFonts(
  withBundleAnalyzer({
    env: {
      GRAPHQL: process.env.GRAPHQL,
      GRAPHQL_BEARER: process.env.GRAPHQL_BEARER,
    },
    experimental: {
      modern: true,
      rewrites() {
        return [{ source: '/sitemap.xml', destination: '/api/sitemap' }]
      },
    },
  }),
)
