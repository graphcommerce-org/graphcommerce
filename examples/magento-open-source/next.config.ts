import { withGraphCommerce } from '@graphcommerce/next-config'
import withSerwistInit from '@serwist/next'
import dotenv from 'dotenv'
import type { NextConfig } from 'next'

dotenv.config({ quiet: true })

const withPWA = withSerwistInit({
  disable: process.env.NODE_ENV === 'development',
  swSrc: 'lib/sw.ts',
  swDest: 'public/sw.js',
  exclude: [/sitemap/, /robots/, 'sw.js', /\.(js|css)\.map$/, /\.well-known\//],
})

const nextConfig: NextConfig = {
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 10,
    pagesBufferLength: 10,
  },
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [52, 75],
    remotePatterns: [{ hostname: 'configurator.reachdigital.dev' }],
  },
  reactCompiler: true,
}

export default withGraphCommerce(withPWA(nextConfig))
