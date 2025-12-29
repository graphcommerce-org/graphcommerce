/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable no-empty-pattern */
import type { Page } from '@playwright/test'
import { test as base } from '@playwright/test'
import type { ApolloLink, TypedDocumentNode } from '../apollo'
import { ApolloClient, getOperationName, InMemoryCache } from '../apollo'

type ApolloClientTest = {
  apolloClient: ApolloClient
}

export async function waitForGraphQlResponse<Q, V>(
  page: Page,
  docOrName: string | TypedDocumentNode<Q, V>,
): Promise<ApolloLink.Result<Q>> {
  const name = typeof docOrName === 'string' ? docOrName : getOperationName(docOrName)

  const response = await page.waitForResponse((r) => {
    try {
      return r.request().postDataJSON()?.operationName === name
    } catch (e) {
      console.error(e)
      return false
    }
  })

  return (await response?.json()) as ApolloLink.Result<Q>
}

/** @public */
export const test = base.extend<ApolloClientTest>({
  apolloClient: async ({}, use) => {
    const client = new ApolloClient({
      uri: 'http://localhost:3000/api/graphql',
      credentials: 'same-origin',
      cache: new InMemoryCache(),
    })
    await use(client)
  },
})
