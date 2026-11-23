import { gql, InMemoryCache } from '@graphcommerce/graphql'
import { magentoTypePolicies } from '@graphcommerce/magento-graphql'
import { expect, it } from 'vitest'
import { CustomerTokenDocument } from './hooks/CustomerToken.gql'
import { customerTypePolicies, migrateCustomer } from './typePolicies'

const createCache = () =>
  new InMemoryCache({ typePolicies: { ...magentoTypePolicies, ...customerTypePolicies } })

it('keeps the email of the sign-in on the customer token after a cache migration', () => {
  const oldCache = createCache()
  oldCache.write({
    dataId: 'ROOT_MUTATION',
    query: gql`
      mutation SignIn($email: String!) {
        generateCustomerToken(email: $email, password: "test-password") {
          __typename
          token
        }
      }
    `,
    variables: { email: 'customer@example.test' },
    result: { generateCustomerToken: { __typename: 'CustomerToken', token: 'test-token' } },
  })

  const newCache = createCache()
  migrateCustomer(oldCache, newCache)

  expect(newCache.readQuery({ query: CustomerTokenDocument })?.customerToken).toMatchObject({
    token: 'test-token',
    email: 'customer@example.test',
  })
})
