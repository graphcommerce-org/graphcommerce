/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */

require('dotenv').config({ path: `${__dirname}/.env` })

const { withGraphCommerce } = require('@graphcommerce/next-config')
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

if (!process.env.GRAPHCMS_URL || !process.env.MAGENTO_ENDPOINT) {
  throw Error('Please specify GRAPHCMS_URL and MAGENTO_ENDPOINT in your .env')
}

if (
  !process.env.NEXT_PUBLIC_LOCALE_STORES ||
  !Object.keys(JSON.parse(process.env.NEXT_PUBLIC_LOCALE_STORES)).length > 0
) {
  throw Error('Please specify NEXT_PUBLIC_LOCALE_STORES in your .env')
}

if (process.env.VERCEL_ENV !== 'production' && process.env.VERCEL_URL) {
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT = `https://${process.env.VERCEL_URL}/api/graphql`
}

if (!process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT) {
  throw Error('Please specify NEXT_PUBLIC_GRAPHQL_ENDPOINT in your .env')
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    scrollRestoration: true,
  },
  optimizeFonts: false,
  swcMinify: true,
  images: {
    domains: (process.env.IMAGE_DOMAINS ?? '').split(',').map((s) => s.trim()),
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  i18n: {
    locales: Object.keys(JSON.parse(process.env.NEXT_PUBLIC_LOCALE_STORES)),
    defaultLocale: Object.keys(JSON.parse(process.env.NEXT_PUBLIC_LOCALE_STORES))[0],
  },
  productionBrowserSourceMaps: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
}

/** @type {import('next').NextConfig} */
module.exports = withPWA(withGraphCommerce(nextConfig))
