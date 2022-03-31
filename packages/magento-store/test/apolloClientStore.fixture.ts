/* eslint-disable no-empty-pattern */
import { ApolloClient, NormalizedCacheObject, InMemoryCache } from '@graphcommerce/graphql'
import { test as base } from '@playwright/test'
import { localeToStore } from '../localeToStore'

type ApolloClientStoreTest = {
  apolloClient: ApolloClient<NormalizedCacheObject>
}

const test = base.extend<ApolloClientStoreTest>({
  apolloClient: async ({ locale }, use) => {
    const store = localeToStore(locale)

    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      credentials: 'same-origin',
      cache: new InMemoryCache(),
      headers: { Store: store },
    })
    await use(client)
  },
})

export { test }
