import { TypedTypePolicies } from '@graphcommerce/graphql'

export const wishlistTypePolicies: TypedTypePolicies = {
  GuestWishlist: {
    keyFields: [],
    fields: {
      items: {
        merge: (existing: Array<unknown> | undefined, incoming: Array<unknown>) => {
          const data = existing === undefined ? [] : existing
          return [...data, ...incoming]
        },
      },
    },
  },

  Query: {
    fields: {
      guestWishlist: (_, { toReference }) => toReference({ __typename: 'GuestWishlist' }),
    },
  },
}
