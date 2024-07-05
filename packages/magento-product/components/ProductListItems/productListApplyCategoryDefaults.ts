import { cloneDeep, useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument, StoreConfigQuery } from '@graphcommerce/magento-store'
import { CategoryDefaultFragment } from './CategoryDefault.gql'
import { ProductListParams } from './filterTypes'
import { ProductListQueryVariables } from '../ProductList/ProductList.gql'

export function useProductListApplyCategoryDefaults(
  params: ProductListParams | undefined,
  category: CategoryDefaultFragment | null | undefined,
): ProductListQueryVariables | undefined {
  const storeConfig = useQuery(StoreConfigDocument)

  if (!params) return params

  const variables = cloneDeep(params)
  if (!variables.pageSize) variables.pageSize = storeConfig.data?.storeConfig?.grid_per_page ?? 12

  if (Object.keys(params.sort).length === 0) {
    const categorySort = category?.default_sort_by as keyof ProductListParams['sort']
    const defaultSort = storeConfig.data?.storeConfig
      ?.catalog_default_sort_by as keyof ProductListParams['sort']
    if (categorySort) variables.sort = { [categorySort]: 'ASC' }
    else if (defaultSort) variables.sort = { [defaultSort]: 'ASC' }
  }

  if (!variables.filters.category_uid?.in?.[0]) {
    variables.filters.category_uid = { eq: category?.uid }
  }

  return variables
}

export async function productListApplyCategoryDefaults(
  params: ProductListParams | undefined,
  conf: StoreConfigQuery,
  category:
    | Promise<CategoryDefaultFragment | null | undefined>
    | CategoryDefaultFragment
    | null
    | undefined,
): Promise<ProductListQueryVariables | undefined>
export async function productListApplyCategoryDefaults(
  params: ProductListParams,
  conf: StoreConfigQuery,
  category:
    | Promise<CategoryDefaultFragment | null | undefined>
    | CategoryDefaultFragment
    | null
    | undefined,
): Promise<ProductListQueryVariables>
export async function productListApplyCategoryDefaults(
  params: ProductListParams | undefined,
  conf: StoreConfigQuery,
  category:
    | Promise<CategoryDefaultFragment | null | undefined>
    | CategoryDefaultFragment
    | null
    | undefined,
): Promise<ProductListQueryVariables | undefined> {
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
