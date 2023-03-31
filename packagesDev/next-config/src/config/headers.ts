// eslint-disable-next-line @typescript-eslint/require-await
export const headers = [
  {
    headers: [
      {
        key: 'Cache-Control',
        value: 'public, no-cache, no-store, max-age=0, must-revalidate',
      },
    ],

    source: '/:path*',
  },
]
