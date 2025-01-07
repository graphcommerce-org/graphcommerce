import type { ProductListQueryVariables } from '@graphcommerce/magento-product'

export function applyEngineVariables(variables: ProductListQueryVariables | undefined) {
  return {
    ...variables,
    filters: {
      ...variables?.filters,
      engine: { eq: 'algolia' },
    },
  }
}
