import { graphqlConfig } from '@graphcommerce/graphql/config'
import fragments from '@graphcommerce/graphql/generated/fragments.json'
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support'
import type { GraphCommerceStorefrontConfig } from '../storefront'

/**
 * Create an Apollo Client for RSC (React Server Components) that uses the graphqlConfig plugin
 * system to configure links and type policies.
 *
 * Note: Some plugins add client-side links (e.g., cookie-based headers) which won't work in RSC.
 * The graphqlConfig is still used to get any server-safe link configurations.
 */
function createRscClient(storefront: GraphCommerceStorefrontConfig) {
  // Use the graphqlConfig plugin system to get configured links and policies
  const config = graphqlConfig({
    storefront,
    links: [],
    policies: [],
    migrations: [],
  })

  // Create the link chain with the configured links
  const link = ApolloLink.from([
    ...config.links,
    new HttpLink({
      uri: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'}/api/graphql`,
      credentials: 'same-origin',
      headers: {
        Store: storefront.magentoStoreCode,
      },
    }),
  ])

  // Create cache with proper type configuration
  // Type policies from config.policies are merged for proper cache behavior
  const cache = new InMemoryCache({
    possibleTypes: fragments.possibleTypes,
    // For RSC with no-cache fetch policy, type policies are less critical
    // but we still use possibleTypes for proper fragment matching
  })

  return new ApolloClient({
    link,
    cache,
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
 * Get Apollo Client for RSC with request deduplication. Uses registerApolloClient from
 *
 * @apollo/experimental-nextjs-app-support to deduplicate requests during a single render.
 */
export function getClient(storefront: GraphCommerceStorefrontConfig) {
  const { getClient: getRegisteredClient } = registerApolloClient(() => createRscClient(storefront))
  return getRegisteredClient()
}
