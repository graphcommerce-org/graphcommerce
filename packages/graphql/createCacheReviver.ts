import { LocalStorageWrapper, CachePersistor } from 'apollo3-cache-persist'
import { mergeDeep, ApolloCache, ApolloClient, NormalizedCacheObject } from './apollo'
import type { TypedTypePolicies } from './generated/types'
import { MigrateCache, migrateCacheHandler } from './migrateCache'
import { getTypePoliciesVersion } from './typePolicies'

const APOLLO_CACHE_PERSIST = 'apollo-cache-persist'
const APOLLO_CACHE_VERSION = 'apollo-cache-version'

let persistor: CachePersistor<NormalizedCacheObject> | undefined

export const persistCache = () => persistor?.persist()

/** Revives the cache from the localStorage if it is available. */
export function createCacheReviver(
  client: ApolloClient<NormalizedCacheObject>,
  createCache: () => ApolloCache<NormalizedCacheObject>,
  policies: TypedTypePolicies[],
  migrations: MigrateCache[],
  incommingState: NormalizedCacheObject = {},
) {
  let state = incommingState
  const typePoliciesVersion = getTypePoliciesVersion(policies)

  if (persistor) return

  if (typeof window !== 'undefined') {
    try {
      const { cache } = client
      persistor = new CachePersistor({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
        maxSize: false,
        key: APOLLO_CACHE_PERSIST,
      })

      const storedState = window.localStorage[APOLLO_CACHE_PERSIST] as string | undefined
      const currentVersion = window.localStorage[APOLLO_CACHE_VERSION] as string | undefined

      if (currentVersion === typePoliciesVersion && storedState) {
        state = mergeDeep(JSON.parse(storedState), incommingState)
      } else if (storedState) {
        console.info(
          '[@graphcommerce/graphql] migrating apollo cache, detected a typePolicy change',
        )
        try {
          const oldCache = createCache()
          oldCache.restore(JSON.parse(storedState) as NormalizedCacheObject)

          // Run the migration
          migrateCacheHandler(oldCache, cache, migrations)

          state = mergeDeep(cache.extract(), incommingState)
          console.info('migration complete')
        } catch (e) {
          console.info('migration error (starting with a clean state):', e)

          // couldn't be upgraded
          state = incommingState
        }
      }
      window.localStorage[APOLLO_CACHE_VERSION] = typePoliciesVersion
      window.localStorage[APOLLO_CACHE_PERSIST] = JSON.stringify(state)

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      persistor.restore()
    } catch (e) {
      console.error(e)
    }
  }

  if (state) client.cache.restore(state)
}
