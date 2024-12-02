import { filterNonNullableKeys } from '@graphcommerce/next-ui/RenderType/filterNonNullableKeys'
import type { SerwistPlugin } from 'serwist'

function extractImageProps(request: Request): {
  request: Request
  url?: string | null
  w?: number | null
  q?: number | null
} {
  const url = new URL(request.url)
  return {
    request,
    url: url.searchParams.get('url'),
    w: parseInt(url.searchParams.get('w') ?? '0', 10),
    q: parseInt(url.searchParams.get('q') ?? '0', 10),
  }
}

async function findRelatedImages(request: Request, cacheName: string) {
  const { w, url, q } = extractImageProps(request)
  if (!url) return undefined
  if (!w) return undefined
  if (!q) return undefined

  const cache = await caches.open(cacheName)
  const requests = (await cache.keys()).map(extractImageProps)
  const cached = filterNonNullableKeys(requests, ['w', 'url', 'q'])
    .filter((c) => c.url === url && c.q === q)
    .sort((a, b) => a.w - b.w)
  return { w, url, q, cached }
}

export function nextImagePlugin(cacheName: string): SerwistPlugin {
  return {
    // cacheDidUpdate: async ({ request }) => {
    //   const result = await findRelatedImages(request, cacheName)
    //   if (!result || result.cached.length <= 1) return

    //   console.log(
    //     result.cached.map((c) => c.request.url),
    //     'are the cached versions',
    //     result.url,
    //     'should be the same as',
    //     request.url,
    //   )
    //   const cache = await caches.open(cacheName)
    //   const toDelete = result.cached.slice(0, -1).map(async (c) => {
    //     await cache.delete(c.request)
    //     return c.request.url
    //   })
    //   console.log('Deleted smaller images from cache', await Promise.all(toDelete))
    // },
    cacheKeyWillBeUsed: async ({ mode, request }) => {
      if (mode !== 'read') return request

      const result = await findRelatedImages(request, cacheName)
      if (!result) return request

      const found = result.cached.find((c) => c.w > result.w)

      if (found) {
        // console.log('Same image, but bigger found in the cache, using that one', found.request.url)
        return found.request
      }

      return request
    },
  }
}
