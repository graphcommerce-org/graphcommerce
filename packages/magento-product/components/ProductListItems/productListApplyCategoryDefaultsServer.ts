import { cloneDeep } from '@graphcommerce/graphql/server'
import type { StoreConfigQuery } from '@graphcommerce/magento-store'
import type { ProductListQueryVariables } from '../ProductList/ProductList.gql'
import type { CategoryDefaultFragment } from './CategoryDefault.gql'
import type { ProductListParams } from './filterTypes'

export async function productListApplyCategoryDefaults(
  params: ProductListParams,
  conf: StoreConfigQuery | undefined,
  category:
    | Promise<CategoryDefaultFragment | null | undefined>
    | CategoryDefaultFragment
    | null
    | undefined,
): Promise<ProductListQueryVariables>
export async function productListApplyCategoryDefaults(
  params: ProductListParams | undefined,
  conf: StoreConfigQuery | undefined,
  category:
    | Promise<CategoryDefaultFragment | null | undefined>
    | CategoryDefaultFragment
    | null
    | undefined,
): Promise<ProductListQueryVariables | undefined> {
  if (!params) return params

  const newParams = cloneDeep(params)
  if (!newParams.pageSize) newParams.pageSize = conf?.storeConfig?.grid_per_page ?? 12

  if (Object.keys(params.sort).length === 0) {
    const categorySort = (await category)?.default_sort_by as keyof ProductListParams['sort']
    const defaultSort = conf?.storeConfig
      ?.catalog_default_sort_by as keyof ProductListParams['sort']
    if (categorySort) newParams.sort = { [categorySort]: 'ASC' }
    else if (defaultSort) newParams.sort = { [defaultSort]: 'ASC' }
  }

  if (!newParams.filters.category_uid?.in?.[0]) {
    const uid = (await category)?.uid
    if (uid) newParams.filters.category_uid = { in: [uid] }
  }

  return newParams
}

export function categoryDefaultsToProductListFilters(
  variables: ProductListQueryVariables | undefined,
): ProductListQueryVariables {
  return { ...variables, filters: { category_uid: variables?.filters?.category_uid } }
}
