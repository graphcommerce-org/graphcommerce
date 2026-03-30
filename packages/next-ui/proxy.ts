import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

/**
 * Base proxy handler for GraphCommerce. Returns NextResponse.next() by default.
 *
 * Extend this via function plugins to add authentication checks, redirects, etc.
 */
export function proxy(request: NextRequest): Response | NextResponse {
  return NextResponse.next()
}
