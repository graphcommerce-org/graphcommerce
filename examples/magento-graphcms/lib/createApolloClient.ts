import MutationQueueLink from '@adobe/apollo-link-mutation-queue'
import { ApolloClient, ApolloLink, NormalizedCacheObject, InMemoryCache } from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import { mergeDeep } from '@apollo/client/utilities'
import { recaptchaLink } from '@graphcommerce/googlerecaptcha'
import {
  fragments,
  measurePerformanceLink,
  mergeTypePolicies,
  getTypePoliciesVersion,
  migrateCacheHandler,
  errorLink,
} from '@graphcommerce/graphql'
import { createAuthLink } from '@graphcommerce/magento-customer'
import { CachePersistor, LocalStorageWrapper } from 'apollo3-cache-persist'

import { policies, migrations } from './typePolicies'

export function createApolloClient(
  locale: string,
  initialState: NormalizedCacheObject = {},
  requestLink: ApolloLink,
): ApolloClient<NormalizedCacheObject> {
  const typePolicies = mergeTypePolicies(policies)
  const typePoliciesVersion = getTypePoliciesVersion(policies)

  const cache = new InMemoryCache({ possibleTypes: fragments.possibleTypes, typePolicies })

  const links = [
    measurePerformanceLink,
    new MutationQueueLink() as unknown as ApolloLink,
    new RetryLink({ attempts: { max: 2 } }),
    errorLink,
    createAuthLink(locale, cache),
    recaptchaLink,
    requestLink,
  ]

  const link = ApolloLink.from(links)

  let state = initialState

  const APOLLO_CACHE_PERSIST = 'apollo-cache-persist'
  const APOLLO_CACHE_VERSION = 'apollo-cache-version'
  if (typeof window !== 'undefined') {
    const storage = new LocalStorageWrapper(window.localStorage)
    const persistor = new CachePersistor({
      cache,
      storage,
      maxSize: false,
      key: APOLLO_CACHE_PERSIST,
    })

    const storedState = window.localStorage[APOLLO_CACHE_PERSIST] as string | undefined
    const currentVersion = window.localStorage[APOLLO_CACHE_VERSION] as string | undefined

    if (currentVersion === typePoliciesVersion && storedState) {
      state = mergeDeep(JSON.parse(storedState), initialState)
    } else if (storedState) {
      console.info('[@graphcommerce/graphql] migrating apollo cache, detected a typePolicy change')
      try {
        const oldCache = new InMemoryCache({ possibleTypes: fragments.possibleTypes, typePolicies })
        oldCache.restore(JSON.parse(storedState) as NormalizedCacheObject)

        // Run the migration
        migrateCacheHandler(oldCache, cache, migrations)

        state = mergeDeep(cache.extract(), initialState)
        console.info('migration complete')
      } catch (e) {
        console.info('migration error (starting with a clean state):', e)

        // couldn't be upgraded
        state = initialState
      }
    }
    window.localStorage[APOLLO_CACHE_VERSION] = typePoliciesVersion
    window.localStorage[APOLLO_CACHE_PERSIST] = JSON.stringify(state)

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    persistor.restore()
  }

  cache.restore(state)

  return new ApolloClient({
    link,
    cache,
    ssrMode: typeof window === 'undefined',
    name: typeof window === 'undefined' ? 'ssr' : 'web',
  })
}
