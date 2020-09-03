import { TypePolicies, FieldPolicy } from '@apollo/client'
import { CustomerTokenDocument } from 'generated/apollo'

const revokeCustomerToken: FieldPolicy<GQLMutation['revokeCustomerToken']> = {
  merge(_existing, incoming, options) {
    console.log('huhshs')
    // options.cache.evict({ id: 'CustomerToken', broadcast: true })
    // options.cache.writeQuery<GQLCustomerTokenQuery, GQLCustomerTokenQueryVariables>({
    //   query: CustomerTokenDocument,
    //   broadcast: true,
    //   data: { customerToken: { __typename: 'CustomerToken', token: '' } },
    // })
    return incoming
  },
}

const generateCustomerToken: FieldPolicy<GQLMutation['generateCustomerToken']> = {
  keyArgs: () => '',
  merge(_existing, incoming, options) {
    if (!options.isReference(incoming)) return incoming

    options.cache.writeQuery<GQLCustomerTokenQuery, GQLCustomerTokenQueryVariables>({
      query: CustomerTokenDocument,
      broadcast: true,
      data: {
        customerToken: {
          __typename: 'CustomerToken',
          token: options.readField('token', incoming),
          createdAt: new Date().toUTCString(),
        },
      },
    })
    return incoming
  },
}

const typePolicies: TypePolicies = {
  Mutation: { fields: { generateCustomerToken, revokeCustomerToken } },
  CustomerToken: { keyFields: (object) => object.__typename },
}

export default typePolicies
