// @vitest-environment happy-dom
import { ApolloClient, ApolloLink, ApolloProvider, InMemoryCache } from '@graphcommerce/graphql'
import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import {
  getPrivateQueryContext,
  usePrivateQueryContext,
} from '../plugins/magentoCustomerPrivateQueryContext'
import { customerTypePolicies } from '../typePolicies'
import { CustomerTokenDocument } from './CustomerToken.gql'
import { useCustomerSession } from './useCustomerSession'

function renderWithToken<T>(valid: boolean, hook: (client: ApolloClient) => T) {
  const client = new ApolloClient({
    cache: new InMemoryCache({ typePolicies: customerTypePolicies }),
    link: ApolloLink.empty(),
  })
  client.writeQuery({
    query: CustomerTokenDocument,
    data: {
      customerToken: {
        __typename: 'CustomerToken',
        token: 'test-token',
        createdAt: null,
        valid,
        xMagentoCacheId: null,
        email: null,
      },
    },
  })
  return renderHook(() => hook(client), {
    wrapper: ({ children }) => <ApolloProvider client={client}>{children}</ApolloProvider>,
  }).result.current
}

describe.each([
  { valid: true, loggedIn: true },
  { valid: false, loggedIn: false },
])('a customer token with valid: $valid', ({ valid, loggedIn }) => {
  it(`sets loggedIn of useCustomerSession to ${loggedIn}`, () => {
    expect(renderWithToken(valid, () => useCustomerSession()).loggedIn).toBe(loggedIn)
  })

  it(`sets loggedIn of the private query context to ${loggedIn}`, () => {
    const contexts = renderWithToken(valid, (client) => [
      getPrivateQueryContext(() => null, client),
      usePrivateQueryContext(() => null),
    ])
    expect(contexts.map((context) => context?.loggedIn ?? false)).toEqual([loggedIn, loggedIn])
  })
})
