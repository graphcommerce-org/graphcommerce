import { cloneDeep, useQuery } from '@graphcommerce/graphql'
import { ProductListParams } from '@graphcommerce/magento-product'
import { StoreConfigDocument, StoreConfigQuery } from '@graphcommerce/magento-store'

export function useProductListApplySearchDefaults(
  params: ProductListParams | undefined,
): ProductListParams | undefined {
  const storeConfig = useQuery(StoreConfigDocument)

  if (!params) return params

  const newParams = cloneDeep(params)

  if (!newParams.pageSize) newParams.pageSize = storeConfig.data?.storeConfig?.grid_per_page ?? 12

  if (Object.keys(params.sort).length === 0) {
    newParams.sort = { relevance: 'DESC' }
  }

  return newParams
}

export function productListApplySearchDefaults(
  params: ProductListParams | undefined,
  conf: StoreConfigQuery,
) {
  if (!params) return params
  const newParams = cloneDeep(params)

  if (!newParams.pageSize) newParams.pageSize = conf.storeConfig?.grid_per_page ?? 12

  if (Object.keys(newParams.sort).length === 0) {
    newParams.sort = { relevance: 'DESC' }
  }

  return newParams
}
