import type { QueryCartArgs, TypedTypePolicies } from '@reachdigital/magento-graphql/index'

const typePolicies: TypedTypePolicies = {
  CurrentCartId: { keyFields: [] },
  Query: {
    fields: {
      currentCartId: (_, { toReference }) => toReference({ __typename: 'CurrentCartId' }),
      cart: (_, { args, toReference }) =>
        toReference({ __typename: 'Cart', id: (args as QueryCartArgs)?.cart_id }),
    },
  },
}

export default typePolicies
