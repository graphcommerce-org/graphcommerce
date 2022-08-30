import { recaptchaLink } from '@graphcommerce/googlerecaptcha'
import {
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
  measurePerformanceLink,
} from '@graphcommerce/graphql'
import { cartTypePolicies, migrateCart, createCartErrorLink } from '@graphcommerce/magento-cart'
import {
  customerTokenLink,
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

const clientRef: { current: ApolloClient<NormalizedCacheObject> | null } = { current: null }

/** HttpLink to connecto to the GraphQL Backend. */
export function httpLink(locale?: string) {
  return ApolloLink.from([
    ...(typeof window === 'undefined' ? [errorLink, measurePerformanceLink] : []),
    // Add the correct store header for the Magento user.
    createStoreLink(locale),
    // Add the correct authorization header for the Magento user.
    customerTokenLink,
    // Replace current cart id with renewed cart id and forward operation
    createCartErrorLink(clientRef),
    // Add recaptcha headers to the request.
    recaptchaLink,
    // The actual Http connection to the Mesh backend.
    new HttpLink({
      uri:
        process.env.CI === '1'
          ? 'http://localhost:4000/graphql'
          : process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
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

export function apolloClient(locale: string | undefined) {
  return new ApolloClient({
    link: httpLink(locale),
    cache: createCache(),
    name: 'web',
    ssrMode: typeof window === 'undefined',
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

  clientRef.current = useMemo(() => apolloClient(router.locale), [router.locale])

  // Update the cache with the latest incomming data, but only when it is changed.
  useMemo(
    () =>
      clientRef.current &&
      createCacheReviver(clientRef.current, createCache, policies, migrations, state),
    [state],
  )

  return <ApolloProvider client={clientRef.current}>{children}</ApolloProvider>
}
