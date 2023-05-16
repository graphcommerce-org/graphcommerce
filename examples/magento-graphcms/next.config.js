/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config({ path: `${__dirname}/.env` })

const { withGraphCommerce } = require('@graphcommerce/next-config')
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
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
  async redirects() {
    return [{ source: '/customer/account', destination: '/account', permanent: true }]
  },
}

module.exports = withGraphCommerce(withPWA(nextConfig), __dirname)
