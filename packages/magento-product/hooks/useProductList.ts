import { useSessionScopeQuery } from '@graphcommerce/magento-customer'
import { ProductListDocument, ProductListQuery } from '../components/ProductList/ProductList.gql'
import { CategoryDefaultFragment } from '../components/ProductListItems/CategoryDefault.gql'
import { ProductListParams } from '../components/ProductListItems/filterTypes'
import { useFilterParams } from '../components/ProductListItems/filteredProductList'
import { useProductListApplyCategoryDefaults } from '../components/ProductListItems/productListApplyCategoryDefaults'

/**
 * - Handles shallow routing requests
 * - Handles customer specific product list queries
 */
export function useProductList<
  T extends ProductListQuery & {
    params?: ProductListParams
    category?: CategoryDefaultFragment | null | undefined
  },
>(props: T) {
  const { category } = props
  const { params, shallow } = useFilterParams(props)
  const variables = useProductListApplyCategoryDefaults(params, category)

  const result = useSessionScopeQuery(ProductListDocument, { variables, skip: !shallow }, props)

  return { ...props, ...result.data, mask: result.mask }
}
