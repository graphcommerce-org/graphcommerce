import { RuntimeCaching } from 'workbox-build'

export const runtimeCachingOptimizations: RuntimeCaching[] = [
  {
    urlPattern: /\/_next\/image?url=.*$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'next-image',
      matchOptions: { ignoreVary: true, ignoreMethod: true, ignoreSearch: true },
      expiration: {
        // Currently experimenting with max cache entries to optimize service worker cache
        maxEntries: 100, // 100 images
        maxAgeSeconds: 48 * 60 * 60, // 48 hours
      },
    },
  },
]
