/* eslint-disable no-empty-pattern */
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { test as base } from '@playwright/test'

const test = base.extend<{ apolloClient: ApolloClient<NormalizedCacheObject> }>({
  apolloClient: async ({}, use) => {
    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:3001/api/graphql',
      credentials: 'same-origin',
      cache: new InMemoryCache({}),
    })
    await use(client)
  },
})

export { test }
