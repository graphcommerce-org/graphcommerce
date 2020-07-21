/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
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
const withTM = require('next-transpile-modules')(['@apollo/client'])

const nextConfig = {
  webpackStats: process.env.ANALYZE === 'true',
  experimental: {
    modern: true,
    rewrites() {
      return [{ source: '/sitemap.xml', destination: '/api/sitemap' }]
    },
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
}

module.exports = withBundleAnalyzer(withPWA(withImages(withTM(nextConfig))))
