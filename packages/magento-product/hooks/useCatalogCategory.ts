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
  const { products: incomingProducts, ...rest } = props

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

  let products = productList.data?.products
  if (shallow) {
    products ??= productList.previousData?.products
  }
  if (!shallow || !loggedIn) {
    products ??= incomingProducts
  }

  // If the user is logged in we might need to show a skeleton:
  let mask = session.query.loading
  if (!session.query.loading && session.loggedIn) {
    const noData = !productList.data?.products
    const noPrevious = !productList.previousData?.products
    mask = shallow ? noData && noPrevious : noData
  }

  return { ...rest, params, mask, products }
}
