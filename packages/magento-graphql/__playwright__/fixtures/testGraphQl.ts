/* eslint-disable no-empty-pattern */
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { test as base } from '@reachdigital/playwright'

const testGraphQl = base.extend<{ apolloClient: ApolloClient<NormalizedCacheObject> }>({
  apolloClient: async ({}, use) => {
    const client = new ApolloClient({
      uri: 'http://localhost:3001/api/graphql',
      cache: new InMemoryCache({}),
    })
    await use(client)
  },
})

export { testGraphQl as testApollo }
