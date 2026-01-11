import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support'
import type { GraphCommerceStorefrontConfig } from '../storefront'

/**
 * Create a simple Apollo Client for RSC (React Server Components) This is a standalone client that
 * doesn't rely on @graphcommerce/graphql barrel exports to avoid pulling in client-side code
 */
function createRscClient(storefront: GraphCommerceStorefrontConfig) {
  return new ApolloClient({
    link: new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/api/graphql`,
      credentials: 'same-origin',
      headers: {
        Store: storefront.magentoStoreCode,
      },
    }),
    cache: new InMemoryCache(),
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
 * @apollo/experimental-nextjs-app-support
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
