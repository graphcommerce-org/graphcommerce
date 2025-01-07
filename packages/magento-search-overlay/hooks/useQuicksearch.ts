import { usePrivateQuery, useQuery } from '@graphcommerce/graphql'
import type {
  FilterFormProviderProps,
  ProductFiltersQuery,
  ProductListParams,
  ProductListQuery,
} from '@graphcommerce/magento-product'
import {
  prefetchProductList,
  ProductListDocument,
  toProductListParams,
} from '@graphcommerce/magento-product'
import {
  productListApplySearchDefaults,
  searchDefaultsToProductListFilters,
  useProductListApplySearchDefaults,
} from '@graphcommerce/magento-search'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { useEventCallback } from '@mui/material'

/**
 * - Handles shallow routing requests
 * - Handles customer specific product list queries
 * - Creates a prefetch function to preload the product list
 */
export function useQuicksearch<
  T extends ProductListQuery & ProductFiltersQuery & { params?: ProductListParams },
>(props: T) {
  const { params } = props
  const variables = useProductListApplySearchDefaults(params)
  const result = usePrivateQuery(
    ProductListDocument,
    { variables: { ...variables, quickSearch: true }, skip: false || !params?.search },
    props,
  )

  const storeConfig = useQuery(StoreConfigDocument).data

  const handleSubmit: NonNullable<FilterFormProviderProps['handleSubmit']> = useEventCallback(
    async (formValues, next) => {
      if (!storeConfig) return

      const vars = productListApplySearchDefaults(toProductListParams(formValues), storeConfig)
      await prefetchProductList(
        { ...vars, quickSearch: true },
        searchDefaultsToProductListFilters(vars),
        next,
        result.client,
        true,
      )
    },
  )

  return { ...props, ...result.data, params, mask: result.mask, handleSubmit }
}
