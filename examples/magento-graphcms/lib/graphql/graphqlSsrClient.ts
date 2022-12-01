import { createHygraphLink } from '@graphcommerce/graphcms-ui'
import {
  NormalizedCacheObject,
  ApolloClient,
  ApolloLink,
  errorLink,
  measurePerformanceLink,
  InMemoryCache,
  fragments,
  HttpLink,
} from '@graphcommerce/graphql'
import { MeshApolloLink } from '@graphcommerce/graphql-mesh'
import { magentoTypePolicies } from '@graphcommerce/magento-graphql'
import { createStoreLink, defaultLocale } from '@graphcommerce/magento-store'
import type { MeshInstance } from '@graphql-mesh/runtime'

const loopback = process.env.VERCEL === '1' && process.env.CI !== '1'

// Do not import the mesh when we're running in loopback mode.
const mesh = loopback
  ? undefined
  : await import('@graphcommerce/graphql-mesh').then(
      ({ getBuiltMesh }) => getBuiltMesh() as Promise<MeshInstance>,
    )

function client(locale: string) {
  if (!mesh) throw Error('Mesh is not available')
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
  if (loopback) {
    return new ApolloClient({
      link: ApolloLink.from([
        measurePerformanceLink,
        errorLink,
        // Add the correct store header for the Magento user.
        createStoreLink(locale),
        // Add the correct locale header for Hygraph localized content.
        createHygraphLink(locale),
        new HttpLink({
          uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
          credentials: 'same-origin',
        }),
      ]),
      cache: new InMemoryCache({
        possibleTypes: fragments.possibleTypes,
        typePolicies: magentoTypePolicies,
      }),
      name: 'fastDev',
      ssrMode: true,
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
