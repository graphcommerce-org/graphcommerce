import type { StrictTypedTypePolicies } from '@graphcommerce/graphql'
import type { QuerycompareListArgs } from '@graphcommerce/graphql-mesh'

export const compareTypePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      compareList: (_, { args, toReference }) =>
        toReference({ __typename: 'CompareList', uid: (args as QuerycompareListArgs)?.uid }),
    },
  },
}
