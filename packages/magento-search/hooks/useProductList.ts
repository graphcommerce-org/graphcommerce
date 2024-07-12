import { useInContextQuery, useQuery } from '@graphcommerce/graphql'
import {
  FilterFormProviderProps,
  ProductFiltersDocument,
  ProductFiltersQuery,
  ProductListDocument,
  ProductListParams,
  ProductListQuery,
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
    },
>(props: T) {
  const { params, shallow } = useRouterFilterParams(props)
  const variables = useProductListApplySearchDefaults(params)
  const result = useInContextQuery(ProductListDocument, { variables, skip: !shallow }, props)
  const filters = useInContextQuery(
    ProductFiltersDocument,
    { variables: searchDefaultsToProductListFilters(variables), skip: !shallow },
    props,
  )

  const storeConfig = useQuery(StoreConfigDocument).data

  const handleSubmit: NonNullable<FilterFormProviderProps['handleSubmit']> = useEventCallback(
    async (formValues, next) => {
      if (!storeConfig) return

      const vars = productListApplySearchDefaults(toProductListParams(formValues), storeConfig)
      await prefetchProductList(
        vars,
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
