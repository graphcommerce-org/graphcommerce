import { LocalStorageWrapper, CachePersistor } from 'apollo3-cache-persist'
import { mergeDeep, ApolloCache, ApolloClient, NormalizedCacheObject } from '../../apollo'
import { ApolloClientConfig } from '../../config'
import { migrateCacheHandler } from './migrateCache'
import { getTypePoliciesVersion } from './typePolicies'

const APOLLO_CACHE_PERSIST = 'apollo-cache-persist'
const APOLLO_CACHE_VERSION = 'apollo-cache-version'

let persistor: CachePersistor<NormalizedCacheObject> | null = null

/** Revives the cache from the localStorage if it is available. */
export async function createCacheReviver(
  client: ApolloClient<NormalizedCacheObject>,
  createCache: () => ApolloCache<NormalizedCacheObject>,
  config: ApolloClientConfig,
  incomingState: NormalizedCacheObject = {},
) {
  let state = incomingState
  const typePoliciesVersion = getTypePoliciesVersion(config.policies)

  if (typeof window !== 'undefined') {
    try {
      const { cache } = client

      if (persistor) await persistor.persist()
      // todo https://github.com/apollographql/apollo-cache-persist/tree/master/examples/react-native/src/utils/persistence
      persistor = new CachePersistor({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
        maxSize: false,
        key: APOLLO_CACHE_PERSIST,
      })

      client.onClearStore(async () => {
        client.cache.restore(incomingState)
        await persistor?.persist()
      })

      client.onResetStore(async () => {
        client.cache.restore(incomingState)
        await persistor?.persist()
      })

      const storedState = window.localStorage[APOLLO_CACHE_PERSIST] as string | undefined
      const currentVersion = window.localStorage[APOLLO_CACHE_VERSION] as string | undefined

      if (currentVersion === typePoliciesVersion && storedState) {
        state = mergeDeep(JSON.parse(storedState), incomingState)
      } else if (storedState) {
        console.info(
          '[@graphcommerce/graphql] migrating apollo cache, detected a typePolicy change',
        )
        try {
          const oldCache = createCache()
          oldCache.restore(JSON.parse(storedState) as NormalizedCacheObject)

          // Run the migration
          migrateCacheHandler(oldCache, cache, config.migrations)

          state = mergeDeep(cache.extract(), incomingState)
          console.info('migration complete')
        } catch (e) {
          console.info('migration error (starting with a clean state):', e)

          // couldn't be upgraded
          state = incomingState
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
