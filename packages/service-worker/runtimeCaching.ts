import { PAGES_CACHE_NAME } from '@serwist/next/worker'
import type { RuntimeCaching } from 'serwist'
import {
  CacheFirst,
  ExpirationPlugin,
  NetworkFirst,
  NetworkOnly,
  RangeRequestsPlugin,
  StaleWhileRevalidate,
} from 'serwist'
import { nextImagePlugin } from './nextImagePlugin'

const devCaching = [{ matcher: /.*/i, handler: new NetworkOnly() }]

const handlers: RuntimeCaching[] = [
  {
    matcher: /\/_next\/image\?url=.+$/i,
    handler: new StaleWhileRevalidate({
      cacheName: 'next-image',
      plugins: [
        nextImagePlugin('next-image'),
        new ExpirationPlugin({
          maxEntries: 1000,
          maxAgeSeconds: 168 * 60 * 60,
          matchOptions: { ignoreVary: true },
          purgeOnQuotaError: true,
          maxAgeFrom: 'last-used',
        }),
      ],
    }),
  },
  {
    matcher: /\/_next\/data\/[^/]+\/.+\.json(\?.*)?$/i,
    handler: new NetworkFirst({
      cacheName: 'next-data',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60,
          maxAgeFrom: 'last-used',
        }),
      ],
    }),
  },
  {
    matcher: ({ sameOrigin, url: { pathname } }) => sameOrigin && pathname.startsWith('/api/'),
    method: 'GET',
    handler: new NetworkFirst({
      cacheName: 'apis',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 16,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
          maxAgeFrom: 'last-used',
        }),
      ],
      networkTimeoutSeconds: 10, // fallback to cache if API does not response within 10 seconds
    }),
  },
  {
    matcher: ({ request, url: { pathname }, sameOrigin }) =>
      request.headers.get('RSC') === '1' &&
      request.headers.get('Next-Router-Prefetch') === '1' &&
      sameOrigin &&
      !pathname.startsWith('/api/'),
    handler: new NetworkFirst({
      cacheName: PAGES_CACHE_NAME.rscPrefetch,
      plugins: [
        new ExpirationPlugin({
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        }),
      ],
    }),
  },
  {
    matcher: ({ request, url: { pathname }, sameOrigin }) =>
      request.headers.get('RSC') === '1' && sameOrigin && !pathname.startsWith('/api/'),
    handler: new NetworkFirst({
      cacheName: PAGES_CACHE_NAME.rsc,
      plugins: [
        new ExpirationPlugin({
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        }),
      ],
    }),
  },
  {
    matcher: ({ request, url: { pathname }, sameOrigin }) =>
      (!request.headers.get('Content-Type') ||
        request.headers.get('Content-Type')?.includes('text/html')) &&
      sameOrigin &&
      !pathname.startsWith('/api/'),
    handler: new NetworkFirst({
      cacheName: PAGES_CACHE_NAME.html,
      plugins: [
        new ExpirationPlugin({
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        }),
      ],
    }),
  },

  {
    matcher: /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
    handler: new StaleWhileRevalidate({
      cacheName: 'runtime-font',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 4,
          maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
          maxAgeFrom: 'last-used',
        }),
      ],
    }),
  },
  {
    matcher: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
    handler: new StaleWhileRevalidate({
      cacheName: 'runtime-image',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 64,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          maxAgeFrom: 'last-used',
        }),
      ],
    }),
  },
  {
    matcher: /\.(?:mp3|wav|ogg)$/i,
    handler: new CacheFirst({
      cacheName: 'runtime-audio',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
          maxAgeFrom: 'last-used',
        }),
        new RangeRequestsPlugin(),
      ],
    }),
  },
  {
    matcher: /\.(?:mp4|webm)$/i,
    handler: new CacheFirst({
      cacheName: 'runtime-video',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
          maxAgeFrom: 'last-used',
        }),
        new RangeRequestsPlugin(),
      ],
    }),
  },
  {
    matcher: ({ url: { pathname }, sameOrigin }) =>
      /\.(?:js)$/i.test(pathname) && !pathname.includes('/_next/static/') && sameOrigin,
    handler: new StaleWhileRevalidate({
      cacheName: 'runtime-js',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 48,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
          maxAgeFrom: 'last-used',
        }),
      ],
    }),
  },
  {
    matcher: ({ url: { pathname }, sameOrigin }) =>
      /\.(?:css)$/i.test(pathname) && !pathname.includes('/_next/static/') && sameOrigin,
    handler: new StaleWhileRevalidate({
      cacheName: 'runtime-css',
      plugins: [
        new ExpirationPlugin({
          maxEntries: 32,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
          maxAgeFrom: 'last-used',
        }),
      ],
    }),
  },
  {
    matcher: ({ sameOrigin }) => !sameOrigin,
    handler: new NetworkOnly(),
  },
]

export const productionCaching = handlers

export const runtimeCaching: RuntimeCaching[] =
  process.env.NODE_ENV !== 'production' ? devCaching : productionCaching
