import { ApolloCache, NormalizedCacheObject } from '@graphcommerce/graphql'
import type { StrictTypedTypePolicies } from '@graphcommerce/graphql'
import type { CartPrices, QuerycartArgs, ShippingCartAddress } from '@graphcommerce/graphql-mesh'
import { CartFabDocument } from './components/CartFab/CartFab.gql'
import { readCartId, writeCartId } from './hooks'

export const cartTypePolicies: StrictTypedTypePolicies = {
  CurrentCartId: { keyFields: [] },
  CartPrices: {
    merge: (exiting, incoming, { mergeObjects }) => mergeObjects(exiting, incoming),
  },
  CartItemPrices: {
    merge: (exiting, incoming, { mergeObjects }) => mergeObjects(exiting, incoming),
  },
  Cart: {
    fields: {
      shipping_addresses: {
        merge: (
          existing: ShippingCartAddress[] | undefined,
          incoming: ShippingCartAddress[],
          options,
        ) => {
          const merged = options.mergeObjects(existing?.[0] ?? {}, incoming[0])
          return merged ? [merged] : []
        },
      },
      prices: {
        merge: (existing: CartPrices[] | undefined, incoming: CartPrices[], options) =>
          options.mergeObjects(existing ?? {}, incoming),
      },
    },
  },
  Query: {
    fields: {
      cart: (_, { args, toReference }) =>
        toReference({ __typename: 'Cart', id: (args as QuerycartArgs)?.cart_id }),
    },
  },
  Mutation: {
    fields: {
      createEmptyCart: {
        merge: (_, incoming: string, options) => {
          options.cache.writeQuery({
            query: CartFabDocument,
            variables: { cartId: incoming },
            data: { cart: { __typename: 'Cart', id: incoming, total_quantity: 0 } },
          })
          return incoming
        },
      },
    },
  },
}

export const migrateCart = (
  oldCache: ApolloCache<NormalizedCacheObject>,
  newCache: ApolloCache<NormalizedCacheObject>,
) => {
  const cartId = readCartId(oldCache)?.id

  if (cartId) {
    writeCartId(newCache, cartId)

    // We have special handling for the CartFab because it tries to load data only from the cache.
    const cartFab = oldCache.readQuery({ query: CartFabDocument })
    newCache.writeQuery({
      query: CartFabDocument,
      data: cartFab,
      variables: { cartId },
      broadcast: true,
    })
  }
}
