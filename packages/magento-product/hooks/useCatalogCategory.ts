import { useQuery } from '@graphcommerce/graphql'
import { useCustomerSession } from '@graphcommerce/magento-customer'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { showPageLoadIndicator } from '@graphcommerce/next-ui'
import { ProductListDocument, ProductListQuery } from '../components/ProductList/ProductList.gql'
import { ProductListParams } from '../components/ProductListItems/filterTypes'
import { useFilterParams } from '../components/ProductListItems/filteredProductList'

/**
 * - Handles shallow routing requests
 * - Handles customer specific product list queries
 */
export function useCategoryCatalog<T extends ProductListQuery & { params?: ProductListParams }>(
  props: T,
) {
  const { params, shallow } = useFilterParams(props)
  const storeConfig = useQuery(StoreConfigDocument)

  const session = useCustomerSession()
  const { loggedIn } = session

  const productList = useQuery(ProductListDocument, {
    variables: {
      pageSize: storeConfig.data?.storeConfig?.grid_per_page ?? 24,
      ...params,
      filters: {
        ...params?.filters,
        ...(loggedIn ? { sku: {} } : {}),
      },
    },
    skip: !shallow && !loggedIn,
  })

  showPageLoadIndicator.set(
    (!loggedIn || !!productList.previousData?.products) && productList.loading,
  )

  let { data } = productList
  if (shallow) data ??= productList.previousData
  if (!shallow || !loggedIn) data ??= props

  // If the user is logged in we might need to show a skeleton:
  let mask = session.query.loading
  if (!session.query.loading && session.loggedIn) {
    mask = shallow ? !productList.data && !productList.previousData : !productList.data
  }

  return { ...props, params, mask, ...data }
}
