import { ApolloClient, ApolloLink, gql, InMemoryCache } from '@apollo/client'
import { LocalState } from '@apollo/client/local-state'
import { expect, it, vi } from 'vitest'
import { cartTypePolicies } from '../../../magento-cart/typePolicies'
import type { ApolloClientConfig } from '../../config'
import { createCacheReviver } from './createCacheReviver'

vi.mock('../../../magento-cart/hooks', () => ({ readCartId: vi.fn(), writeCartId: vi.fn() }))

const query = gql`
  query CurrentCartId {
    currentCartId @client {
      __typename
      id
      locked
    }
  }
`
const currentCartId = { __typename: 'CurrentCartId', id: 'test-cart', locked: false }

it('notifies the watching queries of the revived state', async () => {
  const createCache = () => new InMemoryCache({ typePolicies: cartTypePolicies })
  const client = new ApolloClient({
    cache: createCache(),
    link: ApolloLink.empty(),
    localState: new LocalState(),
  })
  const config = { policies: [cartTypePolicies], migrations: [] } as Partial<ApolloClientConfig>

  const results: unknown[] = []
  const subscription = client.watchQuery({ query }).subscribe(({ data }) => results.push(data))
  await vi.waitFor(() => expect(results.at(-1)).toEqual({ currentCartId: null }))

  await createCacheReviver(client, createCache, config as ApolloClientConfig, {
    ROOT_QUERY: { __typename: 'Query', currentCartId },
  })

  await vi.waitFor(() => expect(results.at(-1)).toEqual({ currentCartId }))
  subscription.unsubscribe()
})
