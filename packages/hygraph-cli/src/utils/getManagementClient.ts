import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { LocalState } from '@apollo/client/local-state'
import type { HygraphConfig } from './getConfig'

export function getManagementClient(config: HygraphConfig) {
  const { authToken: accessToken, uri } = config

  return new ApolloClient({
    link: new HttpLink({
      uri,
      fetch,
      headers: { Authorization: `Bearer ${accessToken}` },
    }),

    cache: new InMemoryCache(),
    localState: new LocalState({}),
  })
}
