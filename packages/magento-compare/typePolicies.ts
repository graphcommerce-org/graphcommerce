import type { StrictTypedTypePolicies } from '@graphcommerce/graphql'
import type { QuerycompareListArgs } from '@graphcommerce/graphql-mesh'

export const compareTypePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      // currentCartId: (_, { toReference }) => toReference({ __typename: 'CurrentCartId' }),
      compareList: (_, { args, toReference }) =>
        toReference({ __typename: 'CompareList', uid: (args as QuerycompareListArgs)?.uid }),
    },
  },
}
