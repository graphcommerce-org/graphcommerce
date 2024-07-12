import { cloneDeep, useQuery } from '@graphcommerce/graphql'
import { ProductListParams, ProductListQueryVariables } from '@graphcommerce/magento-product'
import { StoreConfigDocument, StoreConfigQuery } from '@graphcommerce/magento-store'

export function useProductListApplySearchDefaults(
  params: ProductListParams | undefined,
): ProductListQueryVariables | undefined {
  const storeConfig = useQuery(StoreConfigDocument)

  if (!params) return params

  const newParams = cloneDeep(params)

  if (!newParams.pageSize) newParams.pageSize = storeConfig.data?.storeConfig?.grid_per_page ?? 12

  if (Object.keys(params.sort).length === 0) {
    newParams.sort = { relevance: 'DESC' }
  }

  newParams.filters.engine = { eq: 'algolia' }

  return newParams
}

export function productListApplySearchDefaults(
  params: ProductListParams,
  conf: StoreConfigQuery,
): ProductListQueryVariables
export function productListApplySearchDefaults(
  params: ProductListParams | undefined,
  conf: StoreConfigQuery,
): ProductListQueryVariables | undefined {
  if (!params) return params
  const newParams = cloneDeep(params)

  if (!newParams.pageSize) newParams.pageSize = conf.storeConfig?.grid_per_page ?? 12

  if (Object.keys(newParams.sort).length === 0) {
    newParams.sort = { relevance: 'DESC' }
  }

  newParams.filters.engine = { eq: 'algolia' }

  return newParams
}

export function searchDefaultsToProductListFilters(
  variables: ProductListQueryVariables | undefined,
): ProductListQueryVariables {
  return {
    ...variables,
    filters: { engine: variables?.filters?.engine },
  }
}
