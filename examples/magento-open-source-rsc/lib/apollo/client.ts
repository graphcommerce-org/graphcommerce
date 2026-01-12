import { getBuiltMesh, MeshApolloLink } from '@graphcommerce/graphql-mesh'
import {
  ApolloClient,
  ApolloLink,
  errorLink,
  fragments,
  graphqlConfig,
  InMemoryCache,
  measurePerformanceLink,
  mergeTypePolicies,
} from '@graphcommerce/graphql/server'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support'
import type { GraphCommerceStorefrontConfig } from '../storefront'

/**
 * Create an Apollo Client for RSC (React Server Components).
 *
 * Uses the same pattern as the Pages Router's graphqlSsrClient:
 *
 * - Uses MeshApolloLink with getBuiltMesh() for direct GraphQL Mesh access (no HTTP round-trip)
 * - Uses graphqlConfig plugin system for links and type policies
 * - Includes measurePerformanceLink and errorLink
 * - Sets ssrMode: true with clientAwareness for proper SSR behavior
 */
function createRscClient(storefront: GraphCommerceStorefrontConfig) {
  const config = graphqlConfig({ storefront })

  return new ApolloClient({
    link: ApolloLink.from([
      ...(process.env.NODE_ENV !== 'production' ? [measurePerformanceLink] : []),
      errorLink,
      ...config.links,
      new MeshApolloLink(getBuiltMesh()),
    ]),
    cache: new InMemoryCache({
      possibleTypes: fragments.possibleTypes,
      typePolicies: mergeTypePolicies(config.policies),
    }),
    ssrMode: true,
    clientAwareness: { name: 'rsc' },
    defaultOptions: {
      query: {
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
      },
    },
  })
}

/**
 * Get Apollo Client for RSC with request deduplication.
 *
 * Uses registerApolloClient from @apollo/experimental-nextjs-app-support to deduplicate requests
 * during a single render pass.
 */
export function getClient(storefront: GraphCommerceStorefrontConfig) {
  const { getClient: getRegisteredClient } = registerApolloClient(() => createRscClient(storefront))
  return getRegisteredClient()
}
