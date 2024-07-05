import { cloneDeep } from '@graphcommerce/graphql'
import { ProductListParams } from '@graphcommerce/magento-product'
import { StoreConfigQuery } from '@graphcommerce/magento-store'

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
  if (!newParams.filters.useAlgolia) {
    newParams.filters.useAlgolia = true
  }
  return newParams
}
