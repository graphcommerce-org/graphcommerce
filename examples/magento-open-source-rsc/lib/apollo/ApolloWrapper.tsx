'use client'

import { fragments, graphqlConfig, mergeTypePolicies } from '@graphcommerce/graphql'
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support'
import type { GraphCommerceStorefrontConfig } from '../storefront'

type ApolloWrapperProps = {
  children: React.ReactNode
  storefront: GraphCommerceStorefrontConfig
}

function makeClient(storefront: GraphCommerceStorefrontConfig) {
  const config = graphqlConfig({ storefront })

  const httpLink = new HttpLink({
    uri: '/api/graphql',
    credentials: 'same-origin',
    headers: {
      Store: storefront.magentoStoreCode,
    },
  })

  return new ApolloClient({
    link: ApolloLink.from([...config.links, httpLink]),
    cache: new InMemoryCache({
      possibleTypes: fragments.possibleTypes,
      typePolicies: mergeTypePolicies(config.policies),
    }),
    defaultOptions: {
      query: {
        errorPolicy: 'all',
      },
      watchQuery: {
        errorPolicy: 'all',
      },
    },
  })
}

/**
 * Client-side Apollo Provider for App Router Wraps the application with ApolloNextAppProvider for
 * client-side queries
 */
export function ApolloWrapper({ children, storefront }: ApolloWrapperProps) {
  return (
    <ApolloNextAppProvider makeClient={() => makeClient(storefront)}>
      {children}
    </ApolloNextAppProvider>
  )
}
