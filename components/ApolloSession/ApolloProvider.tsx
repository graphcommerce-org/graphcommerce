import React from 'react'
import { ApolloClient } from 'apollo-client'
import {
  InMemoryCache,
  NormalizedCacheObject,
  IntrospectionFragmentMatcher,
  IdGetterObj,
} from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import introspectionQueryResultData from 'generated/fragments.json'
import { ApolloProvider as ApolloProviderBase } from '@apollo/react-hooks'
import { setContext } from 'apollo-link-context'
import { ApolloLink } from 'apollo-link'
import MutationQueueLink from '@adobe/apollo-link-mutation-queue'
import { RetryLink } from 'apollo-link-retry'

let globalApolloClient: ApolloClient<NormalizedCacheObject> | undefined

export const dataIdFromObject = (value: IdGetterObj) => value.id ?? ''

function createApolloClient(
  initialState: NormalizedCacheObject = {},
): ApolloClient<NormalizedCacheObject> {
  const authLink = setContext((_, { headers }) => {
    const token = window.localStorage.getItem('customer_token')
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  const link = ApolloLink.from([
    new MutationQueueLink() as ApolloLink,
    new RetryLink(),
    authLink,
    new HttpLink({ uri: '/api/graphql', credentials: 'same-origin' }),
  ])

  return new ApolloClient({
    link,
    cache: new InMemoryCache({
      fragmentMatcher: new IntrospectionFragmentMatcher({ introspectionQueryResultData }),
      dataIdFromObject,
    }).restore(initialState),
  })
}

export function initApolloClient(
  initialState: NormalizedCacheObject = {},
): ApolloClient<NormalizedCacheObject> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    throw new Error('Should not run on the server')
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState)
  }

  return globalApolloClient
}
const ApolloProvider: React.FC = ({ children }) => {
  const client = initApolloClient()
  return <ApolloProviderBase client={client}>{children}</ApolloProviderBase>
}

export default ApolloProvider
