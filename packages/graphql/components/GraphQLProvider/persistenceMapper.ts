import { InMemoryCache, NormalizedCacheObject } from '@apollo/client'

function pruneKey(cacheValue: unknown, path: string[]) {
  if (typeof cacheValue !== 'object' || cacheValue === null) return

  const [segment, ...rest] = path
  const regexp = new RegExp(
    segment.replace(/\*/g, '.*?').replace(/\(/g, '\\(').replace(/\)/g, '\\)').replace(/=/g, '\\='),
  )

  Object.keys(cacheValue).forEach((key) => {
    if (!regexp.test(key)) return

    if (rest.length === 0) {
      delete cacheValue[key]
    } else pruneKey(cacheValue[key], rest)
  })
}

function pruneCache(cacheObject: object, patterns: string[]) {
  patterns.forEach((pattern) => pruneKey(cacheObject, pattern.split('.')))
}

export const persistenceMapper = (data: string): Promise<string> => {
  const parsedCache = JSON.parse(data) as NormalizedCacheObject

  pruneCache(parsedCache, [
    'ROOT_MUTATION',
    'ROOT_QUERY.products*',
    'ROOT_QUERY.countries',
    'ROOT_QUERY.checkoutAgreements',
    'ROOT_QUERY.storeConfig',
    'ROOT_QUERY.__type*',
    '*Product:{"uid":"*"}.crosssell_products',
  ])

  const cache = new InMemoryCache({})
  cache.restore(parsedCache)
  cache.gc()
  const newCache = cache.extract()
  return Promise.resolve(JSON.stringify(newCache))
}
