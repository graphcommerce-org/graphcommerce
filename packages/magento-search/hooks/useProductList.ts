import { useSessionScopeQuery } from '@graphcommerce/magento-customer'
import {
  ProductListDocument,
  ProductListParams,
  ProductListQuery,
  useRouterFilterParams,
} from '@graphcommerce/magento-product'
import { useProductListApplySearchDefaults } from '../utils/productListApplySearchDefaults'

/**
 * - Handles shallow routing requests
 * - Handles customer specific product list queries
 */
export function useProductList<
  T extends ProductListQuery & {
    params?: ProductListParams
  },
>(props: T) {
  const { params, shallow } = useRouterFilterParams(props)
  const variables = useProductListApplySearchDefaults(params)
  const result = useSessionScopeQuery(ProductListDocument, { variables, skip: !shallow }, props)

  return {
    ...props,
    ...result.data,
    params,
    mask: result.mask,
    client: result.client,
  }
}
