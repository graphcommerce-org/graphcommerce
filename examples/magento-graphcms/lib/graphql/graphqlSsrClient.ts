import {
  NormalizedCacheObject,
  ApolloClient,
  ApolloLink,
  errorLink,
  measurePerformanceLink,
  InMemoryCache,
  fragments,
  graphqlConfig,
  mergeTypePolicies,
  FetchPolicy,
} from '@graphcommerce/graphql'
import { MeshApolloLink, getBuiltMesh } from '@graphcommerce/graphql-mesh'
import { storefrontConfig, storefrontConfigDefault } from '@graphcommerce/next-ui'
import { i18nSsrLoader } from '../i18n/I18nProvider'

function client(locale: string | undefined, fetchPolicy: FetchPolicy = 'no-cache') {
  const config = graphqlConfig({
    storefront: storefrontConfig(locale) ?? storefrontConfigDefault(),
  })

  return new ApolloClient({
    link: ApolloLink.from([
      measurePerformanceLink,
      errorLink,
      ...config.links,
      new MeshApolloLink(getBuiltMesh()),
    ]),
    cache: new InMemoryCache({
      possibleTypes: fragments.possibleTypes,
      typePolicies: mergeTypePolicies(config.policies),
    }),
    ssrMode: true,
    name: 'ssr',
    defaultOptions: { query: { errorPolicy: 'all', fetchPolicy } },
  })
}

/**
 * Any queries made with the graphqlSharedClient will be send to the browser and injected in the
 * browser's cache.
 */
export function graphqlSharedClient(locale: string | undefined) {
  return client(locale, 'cache-first')
}

export function graphqlSsrClient(locale: string | undefined) {
  return client(locale, 'no-cache')
}
