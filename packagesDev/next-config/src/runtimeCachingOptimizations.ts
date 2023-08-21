export const runtimeCachingOptimizations = [
  {
    urlPattern: /\/_next\/image?url=.*$/i,
    handler: 'StaleWhileRevalidate',
    options: {
      cacheName: 'next-image',
      expiration: {
        // Currently experimenting with max cache entries to optimize service worker cache
        maxEntries: 100, // 100 images
        maxAgeSeconds: 48 * 60 * 60, // 48 hours
      },
    },
  },
]
