import { gql, InMemoryCache } from '@apollo/client'
import { describe, expect, it, vi } from 'vitest'
import { cartTypePolicies } from '../magento-cart/typePolicies'
import { compareTypePolicies } from '../magento-compare/typePolicies'
import { customerTypePolicies, migrateCustomer } from '../magento-customer/typePolicies'
import { recentlyViewedProductsTypePolicies } from '../magento-recently-viewed-products/typePolicies'

vi.mock('../magento-cart/hooks', () => ({ readCartId: vi.fn(), writeCartId: vi.fn() }))

const cases = [
  {
    field: 'customerToken',
    policies: customerTypePolicies,
    selection: '{ __typename token createdAt valid xMagentoCacheId }',
    value: {
      __typename: 'CustomerToken',
      token: 'test-token',
      createdAt: '2026-01-01T00:00:00Z',
      valid: true,
      xMagentoCacheId: null,
    },
  },
  {
    field: 'currentCartId',
    policies: cartTypePolicies,
    selection: '{ __typename id locked }',
    value: { __typename: 'CurrentCartId', id: 'test-cart', locked: false },
  },
  {
    field: 'currentCompareUid',
    policies: compareTypePolicies,
    selection: '{ __typename uid }',
    value: { __typename: 'CurrentCompareUid', uid: 'test-compare' },
  },
  {
    field: 'recentlyViewedProducts',
    policies: recentlyViewedProductsTypePolicies,
    selection: '{ __typename items { __typename sku parentSku } }',
    value: {
      __typename: 'RecentlyViewedProducts',
      items: [{ __typename: 'RecentlyViewedProduct', sku: 'test-sku', parentSku: null }],
    },
  },
]

describe.each(cases)('$field', ({ field, policies, selection, value }) => {
  const query = gql(`query ClientField { ${field} @client ${selection} }`)

  it('returns a complete result from an empty cache', () => {
    const cache = new InMemoryCache({ typePolicies: policies })
    expect(cache.diff({ query })).toMatchObject({ complete: true, result: { [field]: null } })
  })

  it('retains stored values and accepts an explicit clear', () => {
    const cache = new InMemoryCache({ typePolicies: policies })
    cache.writeQuery({ query, data: { [field]: value } })
    expect(cache.readQuery({ query })).toEqual({ [field]: value })
    cache.writeQuery({ query, data: { [field]: null } })
    expect(cache.readQuery({ query })).toEqual({ [field]: null })
  })
})

it('keeps an empty server customer query eligible for fetching', () => {
  const cache = new InMemoryCache({ typePolicies: customerTypePolicies })
  const local = gql`
    query GuestCustomer {
      customer @client {
        email
      }
    }
  `
  const remote = gql`
    query ServerCustomer {
      customer {
        email
      }
    }
  `
  expect(cache.diff({ query: local })).toMatchObject({ complete: true, result: { customer: null } })
  expect(cache.diff({ query: remote }).complete).toBe(false)
  cache.writeQuery({ query: remote, data: { customer: { email: 'customer@example.test' } } })
  expect(cache.readQuery({ query: local })).toEqual({
    customer: { email: 'customer@example.test' },
  })
  cache.writeQuery({ query: remote, data: { customer: null } })
  expect(cache.diff({ query: remote })).toMatchObject({
    complete: true,
    result: { customer: null },
  })
})

it('preserves the destination session when the source cache is empty', () => {
  const source = new InMemoryCache({ typePolicies: customerTypePolicies })
  const destination = new InMemoryCache({ typePolicies: customerTypePolicies })
  const query = gql`
    query CustomerToken {
      customerToken @client {
        token
      }
    }
  `
  destination.writeQuery({ query, data: { customerToken: { token: 'test-token' } } })
  migrateCustomer(source, destination)
  expect(destination.readQuery({ query })).toEqual({ customerToken: { token: 'test-token' } })
})
