/* eslint-disable no-empty-pattern */
import { getOperationName } from '@graphcommerce/graphql'
import { test as base, Page } from '@playwright/test'
import {
  ApolloClient,
  FetchResult,
  InMemoryCache,
  NormalizedCacheObject,
  TypedDocumentNode,
} from '../apollo'

type ApolloClientTest = {
  apolloClient: ApolloClient<NormalizedCacheObject>
}

export async function waitForGraphQlResponse<Q, V>(
  page: Page,
  docOrName: string | TypedDocumentNode<Q, V>,
): Promise<FetchResult<Q>> {
  const name = typeof docOrName === 'string' ? docOrName : getOperationName(docOrName)
  const response = await page.waitForResponse(
    (r) => r.request().postDataJSON()?.operationName === name,
  )
  return (await response?.json()) as FetchResult<Q>
}

const test = base.extend<ApolloClientTest>({
  apolloClient: async ({}, use) => {
    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:3000/api/graphql',
      credentials: 'same-origin',
      cache: new InMemoryCache({}),
    })
    await use(client)
  },
})

export { test }
