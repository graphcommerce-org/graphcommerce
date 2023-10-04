import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Ensure that PURGE requests get rewritten to /api/varnish-purge, which does the invalidation logic

// Currently, it does not appear to be possible to rewrite from the root (/) like below through
// next.config.js, so we use middleware instead. Leaving this for future reference:
// rewrites: async () => ({
//   afterFiles: [
//     {
//       locale: false,
//       source: '/:path*',
//       has: [
//         {
//           type: 'header',
//           key: 'x-magento-tags-pattern',
//         },
//       ],
//       destination: '/api/varnish-purge',
//     },
//   ],
// }),

export function middleware(request: NextRequest) {
  // fixme: Should check remote IP against some configured value, so we don't allow anyone to send PURGE requests
  if (request.method !== 'PURGE' || !request.headers.get('X-Magento-Tags-Pattern')) {
    return undefined
  }

  return NextResponse.rewrite(new URL('/api/varnish-purge', request.url))
}

export const config = { matcher: '/' }
