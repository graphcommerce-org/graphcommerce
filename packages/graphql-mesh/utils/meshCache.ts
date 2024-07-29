import { type MeshContext } from '../.mesh'

type CacheEntry = {
  createdAt: number
  value: any
}

export type MeshCacheOptions = {
  cacheKey: string
  context: MeshContext
  /**
   * Number of seconds the cache value will remain valid.
   */
  ttl: number
}

export async function meshCache<T extends (...args: any[]) => Promise<any>>(
  cb: T,
  options: MeshCacheOptions,
): Promise<ReturnType<T>> {
  const { cacheKey, context, ttl = 0 } = options

  const now = Date.now() / 1000

  const { value, createdAt } = ((await context.cache.get(cacheKey)) as CacheEntry) ?? {}

  if (value && ttl && now - createdAt < ttl) return value

  const res = await cb()
  if (ttl !== 0) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    context.cache.set(cacheKey, { createdAt: now, value: res })
  }
  return res
}
