import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.method !== 'PURGE' || !request.headers.get('X-Magento-Tags-Pattern')) {
    return undefined
  }

  return NextResponse.rewrite(new URL('/api/varnish-purge', request.url))
}

export const config = { matcher: '/' }
