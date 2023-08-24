/* eslint-disable import/no-extraneous-dependencies */
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
      uri: 'http://localhost:3000/api/graphql',
      credentials: 'same-origin',
      cache: new InMemoryCache(),
      headers: { Store: store },
    })
    await use(client)
  },
})

export { test }
