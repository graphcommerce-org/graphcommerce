import { SchemaLink, NormalizedCacheObject, ApolloClient, ApolloLink } from '@graphcommerce/graphql'
import { defaultLocale, localeToStore } from '@graphcommerce/magento-store'
import { createCache, httpLink } from './GraphQLProvider'

const fastDev =
  process.env.NODE_ENV !== 'production' &&
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT?.includes('localhost')

// Do not import the mesh when we're running in fastDev mode.
const mesh = fastDev
  ? undefined
  : await import('@graphcommerce/graphql-mesh').then(({ getBuiltMesh }) => getBuiltMesh())

export function meshLink(locale: string) {
  if (!mesh) throw Error('Mesh not available')
  return ApolloLink.from([
    new SchemaLink({
      ...mesh,
      context: { ...mesh.meshContext, headers: { store: localeToStore(locale) } },
    }),
  ])
}

function client(locale: string) {
  return new ApolloClient({
    link: meshLink(locale),
    cache: createCache(),
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
 *
 * 1. When running locally in development mode we can assume the
 *    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT is available and we call that. We don't want to
 *    create a new mesh every pageload.
 * 2. When running in production mode we load the GraphQL Mesh with a SchemaLink, this prevents a
 *    roundtrip to its own endpoint because that would double the costs (although it might be better
 *    for performance.)\
 *    It will actually only bootup the client when a new serverless instance is created.
 */
export function graphqlClient(
  locale: string | undefined = defaultLocale(),
  shared = true,
): ApolloClient<NormalizedCacheObject> {
  // We're using the HttpLink for development environments so it doesn't have to reload the mesh on every dev change.
  if (fastDev) {
    const cache = createCache()
    return new ApolloClient({
      link: httpLink(cache, locale),
      cache,
      name: 'fastDev',
      ssrMode: typeof window === 'undefined',
    })
  }

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
