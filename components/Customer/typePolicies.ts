import { TypePolicies, FieldPolicy, FieldReadFunction } from '@apollo/client'
import { CustomerTokenDocument } from 'generated/apollo'

const revokeCustomerToken: FieldPolicy<GQLMutation['revokeCustomerToken']> = {
  merge(_existing, incoming, options) {
    options.cache.evict({ id: 'Cart', broadcast: true })
    options.cache.evict({ id: 'Customer', broadcast: true })
    options.cache.evict({ id: 'CustomerToken', broadcast: true })
    return incoming
  },
}

const TOKEN_EXPIRATION_MS = 60 * 60 * 1000

const valid: FieldPolicy<GQLCustomerToken['valid']> = {
  read(existing, options) {
    if (existing === undefined) return existing

    const ref = options.toReference({ __ref: 'CustomerToken' })
    const createdAt = options.readField<string>('createdAt', ref)

    if (!createdAt) return existing

    return new Date().getTime() - new Date(createdAt).getTime() < TOKEN_EXPIRATION_MS
  },
}

const generateCustomerToken: FieldPolicy<GQLMutation['generateCustomerToken']> = {
  keyArgs: () => '',
  merge(_existing, incoming, options) {
    if (!options.isReference(incoming)) return incoming

    const write = () => {
      options.cache.writeQuery<GQLCustomerTokenQuery, GQLCustomerTokenQueryVariables>({
        query: CustomerTokenDocument,
        broadcast: true,
        data: {
          customerToken: {
            __typename: 'CustomerToken',
            token: options.readField('token', incoming),
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

const customer: FieldReadFunction<GQLQuery['customer']> = (incoming, options) => {
  if (!options.canRead(incoming)) return null
  return incoming
}

const typePolicies: TypePolicies = {
  Query: { fields: { customer } },
  Mutation: { fields: { generateCustomerToken, revokeCustomerToken } },
  Customer: { keyFields: (object) => object.__typename },
  CustomerToken: { keyFields: (object) => object.__typename, fields: { valid } },
}

export default typePolicies
