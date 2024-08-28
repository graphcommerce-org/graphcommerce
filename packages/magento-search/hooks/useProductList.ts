import { useInContextQuery, useQuery } from '@graphcommerce/graphql'
import {
  FilterFormProviderProps,
  ProductFiltersDocument,
  ProductFiltersQuery,
  ProductListDocument,
  ProductListParams,
  ProductListQuery,
  ProductListQueryVariables,
  prefetchProductList,
  toProductListParams,
  useRouterFilterParams,
} from '@graphcommerce/magento-product'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { useEventCallback } from '@mui/material'
import {
  productListApplySearchDefaults,
  searchDefaultsToProductListFilters,
  useProductListApplySearchDefaults,
} from '../utils/productListApplySearchDefaults'

/**
 * - Handles shallow routing requests
 * - Handles customer specific product list queries
 * - Creates a prefetch function to preload the product list
 */
export function useProductList<
  T extends ProductListQuery &
    ProductFiltersQuery & {
      params?: ProductListParams
      skipOnLoad?: boolean
      quickSearch?: boolean
    },
>(props: T) {
  const { skipOnLoad = true, quickSearch } = props
  const { params, shallow } = useRouterFilterParams(props)
  const variables = useProductListApplySearchDefaults(params)
  const result = useInContextQuery(
    ProductListDocument,
    { variables: { ...variables, quickSearch }, skip: !shallow && skipOnLoad },
    props,
  )

  const filters = useInContextQuery(
    ProductFiltersDocument,
    {
      variables: searchDefaultsToProductListFilters(variables),
      skip: quickSearch || (!shallow && skipOnLoad),
    },
    props,
  )

  const storeConfig = useQuery(StoreConfigDocument).data

  const handleSubmit: NonNullable<FilterFormProviderProps['handleSubmit']> = useEventCallback(
    async (formValues, next) => {
      if (!storeConfig) return

      const vars = productListApplySearchDefaults(toProductListParams(formValues), storeConfig)
      await prefetchProductList(
        { ...vars, quickSearch },
        searchDefaultsToProductListFilters(vars),
        next,
        result.client,
        true,
      )
    },
  )

  return {
    ...props,
    filters: filters.data.filters,
    ...result.data,
    params,
    mask: result.mask,
    handleSubmit,
  }
}
