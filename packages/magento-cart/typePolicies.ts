import type { QueryCartArgs, ShippingCartAddress, TypedTypePolicies } from '@reachdigital/graphql'
import { CartPrices } from '@reachdigital/graphql/generated/types'

export const cartTypePolicies: TypedTypePolicies = {
  CurrentCartId: { keyFields: [] },
  Cart: {
    fields: {
      shipping_addresses: {
        merge: (
          existing: ShippingCartAddress[] | undefined,
          incoming: ShippingCartAddress[],
          options,
        ) => [options.mergeObjects(existing?.[0] ?? {}, incoming[0])],
      },
      prices: {
        merge: (existing: CartPrices[] | undefined, incoming: CartPrices[], options) =>
          options.mergeObjects(existing ?? {}, incoming),
      },
    },
  },

  Query: {
    fields: {
      currentCartId: (_, { toReference }) => toReference({ __typename: 'CurrentCartId' }),
      cart: (_, { args, toReference }) =>
        toReference({ __typename: 'Cart', id: (args as QueryCartArgs)?.cart_id }),
    },
  },
}
