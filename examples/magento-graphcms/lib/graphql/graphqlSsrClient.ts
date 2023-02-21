import { createHygraphLink } from '@graphcommerce/graphcms-ui'
import {
  NormalizedCacheObject,
  ApolloClient,
  ApolloLink,
  errorLink,
  measurePerformanceLink,
  InMemoryCache,
  fragments,
} from '@graphcommerce/graphql'
import { MeshApolloLink, getBuiltMesh } from '@graphcommerce/graphql-mesh'
import { magentoTypePolicies } from '@graphcommerce/magento-graphql'
import { createStoreLink, defaultLocale } from '@graphcommerce/magento-store'

const mesh = await getBuiltMesh()

function client(locale: string) {
  return new ApolloClient({
    link: ApolloLink.from([
      measurePerformanceLink,
      errorLink,
      createHygraphLink(locale),
      // Add the correct store header for the Magento user.
      createStoreLink(locale),
      new MeshApolloLink(mesh),
    ]),
    cache: new InMemoryCache({
      possibleTypes: fragments.possibleTypes,
      typePolicies: magentoTypePolicies,
    }),
    ssrMode: true,
    name: 'ssr',
  })
}

const sharedClient: {
  [locale: string]: ApolloClient<NormalizedCacheObject>
} = {}

/**
 * Gives back an instance of `ApolloClient` to query the GraphQL Mesh api.
 *
 * We're instantiating in a few different modes to have the best performance/usage possible:
 */
export function graphqlClient(
  locale: string | undefined = defaultLocale(),
  shared = true,
): ApolloClient<NormalizedCacheObject> {
  // If the client isn't shared we create a new client.
  if (!shared) return client(locale)

  // Create a client if it doesn't exist for the locale.
  if (!sharedClient[locale]) sharedClient[locale] = client(locale)

  return sharedClient[locale]
}

export function graphqlSsrClient(locale?: string | undefined) {
  return graphqlClient(locale, false)
}

/**
 * Any queries made with the graphqlSharedClient will be send to the browser and injected in the
 * browser's cache.
 */
export function graphqlSharedClient(locale?: string | undefined) {
  return graphqlClient(locale, true)
}
