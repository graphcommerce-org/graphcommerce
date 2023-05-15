/* eslint-disable import/no-extraneous-dependencies */
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import {
  NormalizedCacheObject,
  ApolloClient,
  ApolloLink,
  errorLink,
  InMemoryCache,
  fragments,
  graphqlConfig,
  mergeTypePolicies,
  FetchPolicy,
  TypedDocumentNode,
  QueryOptions,
  ApolloQueryResult,
} from '@graphcommerce/graphql'
import { measurePerformanceLink } from '@graphcommerce/graphql/components/GraphQLProvider/measurePerformanceLink'
import { storefrontConfig } from '@graphcommerce/next-ui/server'
import { getBuiltMesh } from '../.mesh'
import { MeshApolloLink } from './apolloLink'

const mesh = await getBuiltMesh()

function createClient(fetchPolicy: FetchPolicy = 'no-cache') {
  const config = graphqlConfig({ storefront: storefrontConfig() })

  return new ApolloClient({
    link: ApolloLink.from([
      measurePerformanceLink,
      errorLink,
      ...config.links,
      new MeshApolloLink(mesh),
    ]),
    cache: new InMemoryCache({
      possibleTypes: fragments.possibleTypes,
      typePolicies: mergeTypePolicies(config.policies),
    }),
    ssrMode: true,
    defaultOptions: {
      query: {
        errorPolicy: 'all',
        fetchPolicy,
      },
    },
  })
}

const sharedClient: {
  [locale: string]: ApolloClient<NormalizedCacheObject>
} = {}

/**
 * Any queries made with the graphqlSharedClient will be send to the browser and injected in the
 * browser's cache.
 */
export function graphqlSharedClient() {
  const { locale } = storefrontConfig()
  // Create a client if it doesn't exist for the locale.
  if (!sharedClient[locale]) sharedClient[locale] = createClient('cache-first')
  return sharedClient[locale]
}

const { getClient } = registerApolloClient(() => createClient('no-cache'))

const ssrClient: {
  [locale: string]: ApolloClient<NormalizedCacheObject>
} = {}

export function graphqlSsrClient() {
  const { locale } = storefrontConfig()

  // Create a client if it doesn't exist for the locale.
  if (!ssrClient[locale]) ssrClient[locale] = createClient('no-cache')
  return ssrClient[locale]
}

export function graphqlQueryPassToClient<
  Q = Record<string, unknown>,
  V extends Record<string, unknown> = Record<string, unknown>,
>(
  query: TypedDocumentNode<Q, V>,
  options?: Omit<QueryOptions<V, Q>, 'query'>,
): Promise<ApolloQueryResult<Q>> {
  return getClient()
    .query({ query, ...options })
    .then((res) => ({ ...res, data: JSON.parse(JSON.stringify(res.data)) }))
}

export async function graphqlQuery<
  Q = Record<string, unknown>,
  V extends Record<string, unknown> = Record<string, unknown>,
>(
  query: TypedDocumentNode<Q, V>,
  options?: Omit<QueryOptions<V, Q>, 'query'> | Promise<Omit<QueryOptions<V, Q>, 'query'>>,
): Promise<ApolloQueryResult<Q>> {
  return getClient()
    .query({ query, ...(await options) })
    .then((res) => ({ ...res, data: JSON.parse(JSON.stringify(res.data)) }))
}
