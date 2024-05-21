import { StoreConfigQuery } from '@graphcommerce/magento-store'
import { CategoryDefaultFragment } from './CategoryDefault.gql'
import { ProductListParams } from './filterTypes'
import { cloneDeep } from '@graphcommerce/graphql'

export async function productListApplyCategoryDefaults(
  params: ProductListParams | undefined,
  conf: StoreConfigQuery,
  category: Promise<CategoryDefaultFragment | null | undefined>,
) {
  if (!params) return params

  const newParams = cloneDeep(params)
  if (!newParams.pageSize) newParams.pageSize = conf.storeConfig?.grid_per_page ?? 12

  if (Object.keys(params.sort).length === 0) {
    const categorySort = (await category)?.default_sort_by as keyof ProductListParams['sort']
    const defaultSort = conf.storeConfig?.catalog_default_sort_by as keyof ProductListParams['sort']
    if (categorySort) newParams.sort = { [categorySort]: 'ASC' }
    else if (defaultSort) newParams.sort = { [defaultSort]: 'ASC' }
  }

  if (!newParams.filters.category_uid?.in?.[0]) {
    newParams.filters.category_uid = { eq: (await category)?.uid }
  }

  return newParams
}
