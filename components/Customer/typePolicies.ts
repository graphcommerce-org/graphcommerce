import { TypePolicies, FieldPolicy } from '@apollo/client'
import { CustomerTokenDocument } from 'generated/apollo'

const generateCustomerToken: FieldPolicy<GQLMutation['generateCustomerToken']> = {
  keyArgs: () => '',
  merge(_existing, token, options) {
    if (!options.isReference(token)) {
      return token
    }
    options.cache.writeQuery<GQLCustomerTokenQuery, GQLCustomerTokenQueryVariables>({
      query: CustomerTokenDocument,
      data: {
        customerToken: {
          __typename: 'CustomerToken',
          token: options.readField('token', token),
          createdAt: new Date().toISOString(),
        },
      },
      broadcast: true,
    })
    return token
  },
}

const typePolicies: TypePolicies = {
  Mutation: { fields: { generateCustomerToken } },
  CustomerToken: {
    keyFields: (object) => object.__typename,
  },
}

export default typePolicies
