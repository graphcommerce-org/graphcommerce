import type { FieldPolicy, MigrateCache, StrictTypedTypePolicies } from '@graphcommerce/graphql'
import type { Mutation } from '@graphcommerce/graphql-mesh'
import { CustomerTokenDocument } from './hooks/CustomerToken.gql'

const generateCustomerToken: FieldPolicy<Mutation['generateCustomerToken']> = {
  keyArgs: () => '',
  merge(_existing, incoming, options) {
    console.log('[generateCustomerToken] merge called', {
      isReference: options.isReference(incoming),
      incoming,
    })
    if (!options.isReference(incoming)) return incoming

    const token = options.readField('token', incoming) as string
    console.log('[generateCustomerToken] Writing token to cache:', token?.substring(0, 20))

    options.cache.writeQuery({
      query: CustomerTokenDocument,
      broadcast: true,
      data: {
        customerToken: {
          __typename: 'CustomerToken',
          token,
          createdAt: new Date().toUTCString(),
          valid: true,
          xMagentoCacheId: null,
        },
      },
    })

    // Verify write
    const verify = options.cache.readQuery({ query: CustomerTokenDocument })
    console.log('[generateCustomerToken] Verify after write:', verify)

    return incoming
  },
}

export const customerTypePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      // https://github.com/apollographql/apollo-client/issues/12930
      customerToken: { merge: (existing, incoming) => incoming ?? existing },
    },
  },
  Mutation: { fields: { generateCustomerToken } },
}

export const migrateCustomer: MigrateCache = (oldCache, newCache) => {
  const token = oldCache.readQuery({ query: CustomerTokenDocument })
  if (token) {
    newCache.writeQuery({ query: CustomerTokenDocument, data: token, broadcast: true })
  }
}
