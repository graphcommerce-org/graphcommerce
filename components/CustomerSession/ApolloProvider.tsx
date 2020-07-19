import React from 'react'
import fragments from 'generated/fragments.json'
import {
  ApolloProvider as ApolloProviderBase,
  ApolloClient,
  ApolloLink,
  HttpLink,
  NormalizedCacheObject,
  InMemoryCache,
} from '@apollo/client'
import { RetryLink } from '@apollo/client/link/retry'
import { setContext } from '@apollo/client/link/context'

let globalApolloClient: ApolloClient<NormalizedCacheObject> | undefined

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

  // todo: implement queue link
  const link = ApolloLink.from([
    // new MutationQueueLink() as ApolloLink,
    new RetryLink(),
    authLink,
    new HttpLink({ uri: '/api/graphql', credentials: 'same-origin' }),
  ])

  return new ApolloClient({
    link,
    cache: new InMemoryCache({
      possibleTypes: fragments.possibleTypes,
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
