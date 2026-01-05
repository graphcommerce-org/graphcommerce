import type { StrictTypedTypePolicies } from '@graphcommerce/graphql'

export const recentlyViewedProductsTypePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      // https://github.com/apollographql/apollo-client/issues/12930
      recentlyViewedProducts: { merge: (existing, incoming) => incoming ?? existing },
    },
  },
}
