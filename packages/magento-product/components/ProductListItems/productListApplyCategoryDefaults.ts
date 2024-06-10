import { cloneDeep, useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument, StoreConfigQuery } from '@graphcommerce/magento-store'
import { CategoryDefaultFragment } from './CategoryDefault.gql'
import { ProductListParams } from './filterTypes'

export function useProductListApplyCategoryDefaults(
  params: ProductListParams | undefined,
  category: CategoryDefaultFragment | null | undefined,
): ProductListParams | undefined {
  const storeConfig = useQuery(StoreConfigDocument)

  if (!params) return params

  const newParams = cloneDeep(params)
  if (!newParams.pageSize) newParams.pageSize = storeConfig.data?.storeConfig?.grid_per_page ?? 12

  if (Object.keys(params.sort).length === 0) {
    const categorySort = category?.default_sort_by as keyof ProductListParams['sort']
    const defaultSort = storeConfig.data?.storeConfig
      ?.catalog_default_sort_by as keyof ProductListParams['sort']
    if (categorySort) newParams.sort = { [categorySort]: 'ASC' }
    else if (defaultSort) newParams.sort = { [defaultSort]: 'ASC' }
  }

  if (!newParams.filters.category_uid?.in?.[0]) {
    newParams.filters.category_uid = { eq: category?.uid }
  }

  return newParams
}

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
