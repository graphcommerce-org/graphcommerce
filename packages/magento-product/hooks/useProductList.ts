import { useQuery } from '@graphcommerce/graphql'
import { useSessionScopeQuery } from '@graphcommerce/magento-customer'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { ProductListDocument, ProductListQuery } from '../components/ProductList/ProductList.gql'
import { ProductListParams } from '../components/ProductListItems/filterTypes'
import { useFilterParams } from '../components/ProductListItems/filteredProductList'

/**
 * - Handles shallow routing requests
 * - Handles customer specific product list queries
 */
export function useProductList<T extends ProductListQuery & { params?: ProductListParams }>(
  props: T,
) {
  const { params, shallow } = useFilterParams(props)
  const storeConfig = useQuery(StoreConfigDocument)
  const variables = { pageSize: storeConfig.data?.storeConfig?.grid_per_page ?? 24, ...params }
  const result = useSessionScopeQuery(ProductListDocument, { variables, skip: !shallow }, props)

  return { ...props, ...result.data, mask: result.mask }
}
