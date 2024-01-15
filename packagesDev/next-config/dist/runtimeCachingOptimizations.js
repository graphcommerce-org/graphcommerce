"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runtimeCachingOptimizations = void 0;
exports.runtimeCachingOptimizations = [
    {
        urlPattern: /\/_next\/image\?url=.+$/i,
        handler: 'StaleWhileRevalidate',
        options: {
            cacheName: 'next-image',
            expiration: {
                maxEntries: 1000, // 1000 images
                maxAgeSeconds: 168 * 60 * 60, // 1 week
                matchOptions: { ignoreVary: true },
            },
        },
    },
    {
        urlPattern: /\/_next\/data\/.+\/.+\.json$/i,
        handler: 'NetworkFirst',
        options: {
            cacheName: 'next-data',
            expiration: {
                maxEntries: 32,
                maxAgeSeconds: 24 * 60 * 60, // 24 hours
            },
        },
    },
];
