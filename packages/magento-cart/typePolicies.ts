import { FieldPolicy } from '@apollo/client'
import { Mutation } from '@reachdigital/magento-graphql'
import type { TypedTypePolicies } from '@reachdigital/magento-graphql/index'

/** When an empty cart is created, we store the cartId separately */
const createEmptyCart: FieldPolicy<Mutation['setCurrentCartId']> = {
  keyArgs: [],
  merge(_existing, input, options) {
    if (!input) return input
    return { id: input.id, __typename: 'CurrentCartId' }
  },
}

const typePolicies: TypedTypePolicies = {
  Mutation: { fields: { createEmptyCart } },
  CurrentCartId: { keyFields: [] },
  Query: {
    fields: {
      currentCartId: (_, { toReference }) => toReference({ __typename: 'CurrentCartId' }),
    },
  },
}

export default typePolicies
