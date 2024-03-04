import type { RuntimeCaching } from '@serwist/build'
import { nextImagePlugin } from './nextImagePlugin'

export const runtimeCaching: RuntimeCaching[] = [
  {
    urlPattern: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-font-assets',
      expiration: {
        maxEntries: 4,
        maxAgeSeconds: 7 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-image-assets',
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: /\/_next\/static.+\.js$/i,
    handler: 'CacheFirst',
    options: {
      cacheName: 'next-static-js-assets',
      expiration: {
        maxEntries: 64,
        maxAgeSeconds: 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: /\/_next\/image\?url=.+$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      plugins: [nextImagePlugin('next-image')],
      cacheName: 'next-image',
      expiration: {
        maxEntries: 1000, // 1000 images
        maxAgeSeconds: 168 * 60 * 60, // 1 week
        matchOptions: { ignoreVary: true },
        purgeOnQuotaError: true,
      },
    },
  },
  {
    urlPattern: /\.(?:mp3|wav|ogg)$/i,
    handler: 'CacheFirst',
    options: {
      rangeRequests: true,
      cacheName: 'static-audio-assets',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: /\.(?:mp4|webm)$/i,
    handler: 'CacheFirst',
    options: {
      rangeRequests: true,
      cacheName: 'static-video-assets',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: /\.(?:js)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-js-assets',
      expiration: {
        maxEntries: 48,
        maxAgeSeconds: 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: /\.(?:css|less)$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'static-style-assets',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: /\/_next\/data\/.+\/.+$/i,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'next-data',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: ({ sameOrigin, url: { pathname } }) => {
      // Exclude /api/auth/callback/* to fix OAuth workflow in Safari without having an impact on other environments
      // The above route is the default for next-auth, you may need to change it if your OAuth workflow has a different callback route
      // Issue: https://github.com/shadowwalker/next-pwa/issues/131#issuecomment-821894809
      if (!sameOrigin || pathname.startsWith('/api/auth/callback')) {
        return false
      }
      if (pathname.startsWith('/api/')) {
        return true
      }
      return false
    },
    handler: 'NetworkFirst',
    method: 'GET',
    options: {
      cacheName: 'apis',
      expiration: {
        maxEntries: 16,
        maxAgeSeconds: 24 * 60 * 60,
      },
      networkTimeoutSeconds: 10,
    },
  },
  {
    urlPattern: ({ request, url: { pathname }, sameOrigin }) =>
      request.headers.get('RSC') === '1' &&
      request.headers.get('Next-Router-Prefetch') === '1' &&
      sameOrigin &&
      !pathname.startsWith('/api/'),
    handler: 'NetworkFirst',
    options: {
      cacheName: 'pages-rsc-prefetch',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: ({ request, url: { pathname }, sameOrigin }) =>
      request.headers.get('RSC') === '1' && sameOrigin && !pathname.startsWith('/api/'),
    handler: 'NetworkFirst',
    options: {
      cacheName: 'pages-rsc',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: ({ url: { pathname }, sameOrigin }) => sameOrigin && !pathname.startsWith('/api/'),
    handler: 'NetworkFirst',
    options: {
      cacheName: 'pages',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60,
      },
    },
  },
  {
    urlPattern: ({ sameOrigin }) => !sameOrigin,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'cross-origin',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 60 * 60,
      },
      networkTimeoutSeconds: 10,
    },
  },
  {
    urlPattern: /\.(?:json|xml|csv)$/i,
    handler: 'NetworkFirst',
    options: {
      cacheName: 'static-data-assets',
      expiration: {
        maxEntries: 32,
        maxAgeSeconds: 24 * 60 * 60,
      },
    },
  },
]
