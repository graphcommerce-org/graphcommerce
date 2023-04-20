import { ApolloCache, NormalizedCacheObject } from '../../apollo'

export type MigrateCache = (
  oldCache: ApolloCache<NormalizedCacheObject>,
  newCache: ApolloCache<NormalizedCacheObject>,
) => void

export const migrateCacheHandler = (
  oldCache: ApolloCache<NormalizedCacheObject>,
  newCache: ApolloCache<NormalizedCacheObject>,
  migrations: MigrateCache[],
) => {
  migrations.forEach((migration) => migration(oldCache, newCache))
}
