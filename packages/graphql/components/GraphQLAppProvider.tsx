'use client'

import { ApolloClient, ApolloLink, HttpLink, SuspenseCache } from '@apollo/client'
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { storefrontConfig } from '@graphcommerce/next-ui'
import { setVerbosity } from 'ts-invariant'
import { graphqlConfig } from '../config'
import fragments from '../generated/fragments.json'
import { mergeTypePolicies } from './GraphQLProvider/typePolicies'

setVerbosity('debug')

// have a function to create a client for you
function makeClient() {
  const storefront = storefrontConfig()
  const config = graphqlConfig({ storefront })

  const link = ApolloLink.from([
    ...config.links,
    // The actual Http connection to the Mesh backend.
    new HttpLink({ uri: 'http://localhost:3000/api/graphql', credentials: 'same-origin' }),
  ])

  return new ApolloClient({
    cache: new NextSSRInMemoryCache({
      possibleTypes: fragments.possibleTypes,
      typePolicies: mergeTypePolicies(config.policies),
    }),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), link])
        : link,
  })
}

// also have a function to create a suspense cache
function makeSuspenseCache() {
  return new SuspenseCache()
}

// you need to create a component to wrap your app in
export function GraphqlAppProvider({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient} makeSuspenseCache={makeSuspenseCache}>
      {children}
    </ApolloNextAppProvider>
  )
}
