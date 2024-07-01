import { ApolloQueryResult, useQuery } from '@graphcommerce/graphql'
import { CustomerTokenDocument, useSessionScopeQuery } from '@graphcommerce/magento-customer'
import {
  FilterFormProviderProps,
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
  useProductListApplySearchDefaults,
} from '../utils/productListApplySearchDefaults'

/**
 * - Handles shallow routing requests
 * - Handles customer specific product list queries
 * - Creates a prefetch function to preload the product list
 */
export function useProductList<
  T extends ProductListQuery & {
    params?: ProductListParams
  },
>(props: T) {
  const { params, shallow } = useRouterFilterParams(props)
  const variables = useProductListApplySearchDefaults(params)
  const result = useSessionScopeQuery(ProductListDocument, { variables, skip: !shallow }, props)
  const storeConfig = useQuery(StoreConfigDocument).data

  const handleSubmit: NonNullable<FilterFormProviderProps['handleSubmit']> = useEventCallback(
    async (formValues, next) => {
      if (!storeConfig) return

      const vars = {
        ...productListApplySearchDefaults(toProductListParams(formValues), storeConfig),
        sessionScope: {
          loggedIn: !!result.client.cache.readQuery({ query: CustomerTokenDocument })?.customerToken
            ?.token,
        },
      }
      await prefetchProductList(vars, next, result.client, true)
    },
  )

  return { ...props, ...result.data, params, mask: result.mask, handleSubmit }
}
