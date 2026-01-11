import {
  errorLink,
  fragments,
  graphqlConfig,
  measurePerformanceLink,
  mergeTypePolicies,
} from '@graphcommerce/graphql'
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support'
import type { GraphCommerceStorefrontConfig } from '../storefront'

/**
 * Create an Apollo Client for RSC (React Server Components) This client is used for server-side
 * data fetching in the App Router
 */
function createRscClient(storefront: GraphCommerceStorefrontConfig) {
  const config = graphqlConfig({ storefront })

  return new ApolloClient({
    link: ApolloLink.from([
      measurePerformanceLink,
      errorLink,
      ...config.links,
      // The actual Http connection to the Mesh backend.
      new HttpLink({
        uri: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/api/graphql`,
        credentials: 'same-origin',
        headers: {
          Store: storefront.magentoStoreCode,
        },
      }),
    ]),
    cache: new InMemoryCache({
      possibleTypes: fragments.possibleTypes,
      typePolicies: mergeTypePolicies(config.policies),
    }),
    ssrMode: true,
    defaultOptions: {
      query: {
        errorPolicy: 'all',
        fetchPolicy: 'no-cache', // RSC should always fetch fresh data
      },
    },
  })
}

/**
 * Get Apollo Client for RSC with request deduplication Uses registerApolloClient from
 * @apollo/client-integration-nextjs
 */
export function getClient(storefront: GraphCommerceStorefrontConfig) {
  const { getClient: getRegisteredClient } = registerApolloClient(
    () => createRscClient(storefront),
    {
      // Each storefront gets its own client instance
      cacheKey: `rsc-client-${storefront.locale}`,
    },
  )
  return getRegisteredClient()
}
