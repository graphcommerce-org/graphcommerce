import { rewritePurgeRequest } from '@graphcommerce/magento-varnish-purge'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return rewritePurgeRequest(request)
}

export const config = { matcher: '/' }
