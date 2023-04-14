import { createHygraphLink } from '@graphcommerce/graphcms-ui'
import {
  NormalizedCacheObject,
  ApolloClient,
  ApolloLink,
  errorLink,
  measurePerformanceLink,
  InMemoryCache,
  fragments,
  FetchPolicy,
} from '@graphcommerce/graphql'
import { MeshApolloLink, getBuiltMesh } from '@graphcommerce/graphql-mesh'
import { magentoTypePolicies } from '@graphcommerce/magento-graphql'
import { createStoreLink, defaultLocale } from '@graphcommerce/magento-store'

const mesh = await getBuiltMesh()

function client(locale: string, fetchPolicy: FetchPolicy) {
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
    defaultOptions: { query: { errorPolicy: 'all', fetchPolicy }, watchQuery: { fetchPolicy } },
  })
}

const sharedClient: {
  [locale: string]: ApolloClient<NormalizedCacheObject>
} = {}

/**
 * Any queries made with the graphqlSharedClient will be send to the browser and injected in the
 * browser's cache.
 */
export function graphqlSharedClient(locale: string | undefined = defaultLocale()) {
  // Create a client if it doesn't exist for the locale.
  if (!sharedClient[locale]) sharedClient[locale] = client(locale, 'cache-first')
  return sharedClient[locale]
}

const ssrClient: {
  [locale: string]: ApolloClient<NormalizedCacheObject>
} = {}

export function graphqlSsrClient(locale: string | undefined = defaultLocale()) {
  // Create a client if it doesn't exist for the locale.
  if (!ssrClient[locale]) ssrClient[locale] = client(locale, 'no-cache')

  return ssrClient[locale]
}
