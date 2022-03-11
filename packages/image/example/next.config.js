/* eslint-disable @typescript-eslint/no-var-requires */

const withGraphCommerce = require('@graphcommerce/next-config').withYarn1Workspaces()

/** @type {import('next').NextConfig} */
const config = {
  images: {
    domains: ['upload.wikimedia.org', 'backend.reachdigital.dev'],
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
  },
}

module.exports = withGraphCommerce(config)
