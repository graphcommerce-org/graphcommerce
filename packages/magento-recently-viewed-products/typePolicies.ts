import type { StrictTypedTypePolicies } from '@graphcommerce/graphql'

export const recentlyViewedProductsTypePolicies: StrictTypedTypePolicies = {
  Query: {
    fields: {
      recentlyViewedProducts: { read: (existing) => existing ?? null },
    },
  },
}
