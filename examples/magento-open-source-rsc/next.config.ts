import { withGraphCommerce } from '@graphcommerce/next-config'
import dotenv from 'dotenv'
import type { NextConfig } from 'next'

dotenv.config({ quiet: true })

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
}

// Use withGraphCommerce with i18n disabled for App Router
// App Router uses [store] dynamic segment instead of Next.js i18n
export default withGraphCommerce(nextConfig, { i18n: false })
