import type { FieldPolicy, MigrateCache, StrictTypedTypePolicies } from '@graphcommerce/graphql'
import type { Mutation } from '@graphcommerce/graphql-mesh'
import { CustomerTokenDocument } from './hooks/CustomerToken.gql'

const generateCustomerToken: FieldPolicy<Mutation['generateCustomerToken']> = {
  keyArgs: () => '',
  merge(_existing, incoming, options) {
    if (!options.isReference(incoming)) return incoming

    options.cache.writeQuery({
      query: CustomerTokenDocument,
      broadcast: true,
      data: {
        customerToken: {
          __typename: 'CustomerToken',
          token: options.readField('token', incoming) as string,
          createdAt: new Date().toUTCString(),
          valid: true,
          xMagentoCacheId: null,
        },
      },
    })

    return incoming
  },
}

export const customerTypePolicies: StrictTypedTypePolicies = {
  Mutation: { fields: { generateCustomerToken } },
}

export const migrateCustomer: MigrateCache = (oldCache, newCache) => {
  const token = oldCache.readQuery({ query: CustomerTokenDocument })
  newCache.writeQuery({ query: CustomerTokenDocument, data: token, broadcast: true })
}
