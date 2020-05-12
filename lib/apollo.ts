import { ApolloClient } from 'apollo-client'
import {
  InMemoryCache,
  NormalizedCacheObject,
  IntrospectionFragmentMatcher,
  IdGetterObj,
} from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import introspectionQueryResultData from 'generated/fragments.json'

let globalApolloClient: ApolloClient<NormalizedCacheObject> | undefined

export const dataIdFromObject = (value: IdGetterObj & { locale?: string }) =>
  (value.id ?? '') + (value.locale ?? '')

function createApolloClient(
  initialState: NormalizedCacheObject = {},
): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({ uri: '/api/graphql', credentials: 'same-origin' }),
    cache: new InMemoryCache({
      fragmentMatcher: new IntrospectionFragmentMatcher({ introspectionQueryResultData }),
      dataIdFromObject,
    }).restore(initialState),
  })
}

export default function initApolloClient(
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
