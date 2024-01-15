import type { FieldPolicy, MigrateCache, StrictTypedTypePolicies } from '@graphcommerce/graphql'
import type { CustomerToken, Mutation } from '@graphcommerce/graphql-mesh'
import { CustomerTokenDocument } from './hooks/CustomerToken.gql'
import { IsEmailAvailableDocument } from './hooks/IsEmailAvailable.gql'

const TOKEN_EXPIRATION_MS = 60 * 60 * 1000

const valid: FieldPolicy<CustomerToken['valid']> = {
  read(existing, options) {
    if (existing === undefined) return existing

    const ref = options.toReference({ __ref: 'CustomerToken' })
    const createdAt = options.readField<string>('createdAt', ref)

    if (!createdAt) return existing

    return new Date().getTime() - new Date(createdAt).getTime() < TOKEN_EXPIRATION_MS
  },
}

const generateCustomerToken: FieldPolicy<Mutation['generateCustomerToken']> = {
  keyArgs: () => '',
  merge(_existing, incoming, options) {
    if (!options.isReference(incoming)) return incoming

    const write = () => {
      options.cache.writeQuery({
        query: CustomerTokenDocument,
        broadcast: true,
        data: {
          customerToken: {
            __typename: 'CustomerToken',
            token: options.readField('token', incoming) as string,
            createdAt: new Date().toUTCString(),
            valid: true,
          },
        },
      })
    }
    write()

    // Broadcasts the query after the token expiration so UI gets updated
    setTimeout(write, TOKEN_EXPIRATION_MS)
    return incoming
  },
}

export const customerTypePolicies: StrictTypedTypePolicies = {
  Mutation: { fields: { generateCustomerToken } },
  CustomerToken: { fields: { valid } },
}

export const migrateCustomer: MigrateCache = (oldCache, newCache) => {
  const token = oldCache.readQuery({ query: CustomerTokenDocument })
  newCache.writeQuery({ query: CustomerTokenDocument, data: token, broadcast: true })
}
