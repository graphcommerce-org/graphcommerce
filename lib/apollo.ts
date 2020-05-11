import { ApolloClient } from 'apollo-client'
import {
  InMemoryCache,
  NormalizedCacheObject,
  IntrospectionFragmentMatcher,
  IdGetterObj,
} from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
// todo(paales): replace by build in nextjs fetch polyfill
import fetch from 'isomorphic-unfetch'
import introspectionQueryResultData from 'generated/fragments.json'

let globalApolloClient: ApolloClient<NormalizedCacheObject> | undefined

/**
 * Creates and configures the ApolloClient
 */
function createApolloClient(
  initialState: NormalizedCacheObject = {},
): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL,
      // headers: { Authorization: process.env.NEXT_PUBLIC_GRAPHQL_BEARER },
      credentials: 'same-origin',
      fetch,
    }),
    cache: new InMemoryCache({
      fragmentMatcher: new IntrospectionFragmentMatcher({
        introspectionQueryResultData,
      }),
      dataIdFromObject: (value: IdGetterObj & { locale?: string }) =>
        (value.id ?? '') + (value.locale ?? ''),
    }).restore(initialState),
  })
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
export default function initApolloClient(
  initialState: NormalizedCacheObject = {},
): ApolloClient<NormalizedCacheObject> {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState)
  }

  // Reuse client on the client-side
  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(initialState)
  }

  return globalApolloClient
}
