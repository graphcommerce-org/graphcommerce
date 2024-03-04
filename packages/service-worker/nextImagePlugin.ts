import { filterNonNullableKeys } from '@graphcommerce/next-ui/RenderType/filterNonNullableKeys'
import type { SerwistPlugin } from '@serwist/core'

function extractImageProps(request: Request): {
  url?: string | null
  w?: number | null
  q?: number | null
} {
  const url = new URL(request.url)
  // const searchParams = { ...url.searchParams.entries() }
  return {
    url: url.searchParams.get('url'),
    w: parseInt(url.searchParams.get('w') ?? '0', 10),
    q: parseInt(url.searchParams.get('q') ?? '0', 10),
  }
}

export function nextImagePlugin(cacheName: string): SerwistPlugin {
  return {
    cacheKeyWillBeUsed: async ({ mode, request, state }) => {
      if (mode !== 'read') return request

      const { w, url, q } = extractImageProps(request)
      if (!url) return request
      if (!w) return request
      if (!q) return request

      const cache = await caches.open(cacheName)
      const requests = (await cache.keys()).map(extractImageProps)

      const found = filterNonNullableKeys(requests, ['w', 'url', 'q'])
        .filter((cached) => cached.url === url)
        .find((cached) => cached.w > w && cached.q >= q)

      if (found) {
        console.log('Same image, but bigger found in the cache, using that one', found.url)
        return found.url
      }

      return request
    },
  }
}
