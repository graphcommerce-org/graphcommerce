import type { ApolloCache } from '../../apollo'

export type MigrateCache = (oldCache: ApolloCache, newCache: ApolloCache) => void

export const migrateCacheHandler = (
  oldCache: ApolloCache,
  newCache: ApolloCache,
  migrations: MigrateCache[],
) => {
  migrations.forEach((migration) => migration(oldCache, newCache))
}
