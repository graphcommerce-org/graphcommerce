import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

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

/**
 * Method to invoke from your middleware to check if we need to rewrite PURGE
 * requests to an API route. This is needed because Magento purge requests
 * always go to the root, and can't be rewritten through nextjs configuration.
 */
export function rewritePurgeRequest(request: NextRequest): NextResponse<unknown> | undefined {
  if (request.method !== 'PURGE' || !request.headers.get('X-Magento-Tags-Pattern')) {
    return undefined
  }

  return NextResponse.rewrite(new URL('/api/varnish-purge', request.url))
}
