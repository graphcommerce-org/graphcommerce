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

const { getClient } = registerApolloClient(() => createClient('cache-first'))

const ssrClient: {
  [locale: string]: ApolloClient<NormalizedCacheObject>
} = {}

export function graphqlSsrClient() {
  const { locale } = storefrontConfig()

  // Create a client if it doesn't exist for the locale.
  if (!ssrClient[locale]) ssrClient[locale] = createClient('cache-first')
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

type CacheAndRevalidate = {
  cache?: 'force-cache' | 'no-store'
  revalidate?: NextFetchRequestConfig['revalidate']
  tags?: NextFetchRequestConfig['tags']
}

export async function graphqlQuery<
  Q = Record<string, unknown>,
  V extends Record<string, unknown> = Record<string, unknown>,
  O extends CacheAndRevalidate &
    Omit<QueryOptions<V, Q>, 'query' | 'fetchPolicy'> = CacheAndRevalidate &
    Omit<QueryOptions<V, Q>, 'query' | 'fetchPolicy'>,
>(
  query: TypedDocumentNode<Q, V>,
  options: O | Promise<O | undefined> | undefined,
): Promise<ApolloQueryResult<Q>> {
  const { revalidate, tags, cache, context, ...rest } = (await options) || {}

  // Automatically add tags to the request headers.

  return getClient()
    .query({
      query,
      ...rest,
      context: {
        ...(context ?? {}),
        headers: {
          'x-fetch': `${cache ?? ''} ${revalidate || ''} ${tags?.join(' ') || ''}`,
          ...(context?.headers ?? {}),
        },
      },
    })
    .then((res) => ({
      ...res,
      data: res?.data ? JSON.parse(JSON.stringify(res.data)) : null,
    }))
}
