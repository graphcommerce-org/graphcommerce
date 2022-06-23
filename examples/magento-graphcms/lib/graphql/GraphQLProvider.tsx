import { recaptchaLink } from '@graphcommerce/googlerecaptcha'
import {
  ApolloCache,
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  createCacheReviver,
  fragments,
  mergeTypePolicies,
  errorLink,
} from '@graphcommerce/graphql'
import { cartTypePolicies, migrateCart } from '@graphcommerce/magento-cart'
import {
  createCustomerTokenLink,
  customerTypePolicies,
  migrateCustomer,
} from '@graphcommerce/magento-customer'
import { magentoTypePolicies } from '@graphcommerce/magento-graphql'
import { createStoreLink } from '@graphcommerce/magento-store'
import { wishlistTypePolicies } from '@graphcommerce/magento-wishlist'
import { ApolloStateProps } from '@graphcommerce/next-ui'
import { AppProps } from 'next/app'
import { useMemo } from 'react'

/**
 * This is a list of type policies which are used to influence how cache is handled.
 * https://www.apollographql.com/docs/react/caching/cache-field-behavior/
 */
const policies = [magentoTypePolicies, cartTypePolicies, customerTypePolicies, wishlistTypePolicies]

/**
 * To upgrade the local storage to a new version when the app is updated, but the client isn't yet,
 * we run these migrations.
 */
const migrations = [migrateCart, migrateCustomer]

/** HttpLink to connecto to the GraphQL Backend. */
export function httpLink(cache: ApolloCache<NormalizedCacheObject>, locale?: string) {
  return ApolloLink.from([
    ...(process.env.NODE_ENV !== 'production' ? [errorLink] : []),
    // Add the correct store header for the Magento user.
    createStoreLink(locale),
    // Add the correct authorization header for the Magento user.
    createCustomerTokenLink(cache),
    // Add recaptcha headers to the request.
    recaptchaLink,
    // The actual Http connection to the Mesh backend.
    new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      credentials: 'same-origin',
    }),
  ])
}

/** We're creating a fairly common InMemoryCache, but also include: `possibleTypes` and `typePolicies` */
export function createCache() {
  return new InMemoryCache({
    possibleTypes: fragments.possibleTypes,
    typePolicies: mergeTypePolicies(policies),
  })
}

type GraphQLProviderProps = {
  children: React.ReactNode
} & Pick<AppProps, 'pageProps' | 'router'>

/**
 * - Creates an instance of ApolloClient that will update it's cache when the server responds with a new cache.
 * - It also is able to revive the cache from a previous visit.
 */
export function GraphQLProvider({ children, router, pageProps }: GraphQLProviderProps) {
  const state = (pageProps as Partial<ApolloStateProps>).apolloState

  const client = useMemo(() => {
    const cache = createCache()
    return new ApolloClient({
      link: httpLink(cache, router.locale),
      cache,
      name: 'web',
      ssrMode: typeof window === 'undefined',
    })
  }, [router.locale])

  // Update the cache with the latest incomming data, but only when it is changed.
  useMemo(
    () => createCacheReviver(client, createCache, policies, migrations, state),
    [client, state],
  )

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
