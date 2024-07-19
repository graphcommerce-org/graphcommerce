import { debounce } from '@graphcommerce/ecommerce-ui'
import {
  ApolloClient,
  useQuery,
  useInContextQuery,
  getInContextInput,
} from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { showPageLoadIndicator } from '@graphcommerce/next-ui'
import { useEventCallback } from '@mui/material'
import {
  FilterFormProviderProps,
  ProductFiltersDocument,
  ProductFiltersQuery,
  ProductFiltersQueryVariables,
} from '../components'
import {
  ProductListDocument,
  ProductListQuery,
  ProductListQueryVariables,
} from '../components/ProductList/ProductList.gql'
import { CategoryDefaultFragment } from '../components/ProductListItems/CategoryDefault.gql'
import { ProductListParams, toProductListParams } from '../components/ProductListItems/filterTypes'
import { useRouterFilterParams } from '../components/ProductListItems/filteredProductList'
import {
  productListApplyCategoryDefaults,
  categoryDefaultsToProductListFilters,
  useProductListApplyCategoryDefaults,
} from '../components/ProductListItems/productListApplyCategoryDefaults'

const productListQueries: Array<Promise<any>> = []

type Next = Parameters<NonNullable<FilterFormProviderProps['handleSubmit']>>[1]

export const prefetchProductList = debounce(
  async (
    variables: ProductListQueryVariables,
    filtersVariables: ProductFiltersQueryVariables,
    next: Next,
    client: ApolloClient<any>,
    shallow: boolean,
  ) => {
    if (!shallow) return next(shallow)

    showPageLoadIndicator.set(true)

    const context = getInContextInput(client)
    const productList = client.query({
      query: ProductListDocument,
      variables: { ...variables, context },
    })

    const productFilters = client.query({
      query: ProductFiltersDocument,
      variables: {
        ...filtersVariables,
        context,
      },
    })

    const both = Promise.all([productList, productFilters])

    // Push the query to the queue array.
    productListQueries.push(both)

    // Since we're waiting here the form will be submitting for longer.
    await both

    const includes = productListQueries.includes(both)

    // Remove all requests that are before the current request
    const index = productListQueries.indexOf(both)
    if (index > -1) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      productListQueries.splice(0, index + 1)
    }

    if (productListQueries.length === 0) showPageLoadIndicator.set(false)

    if (includes) {
      // todo: When navigating a category, it should now be a shallow route

      // If the resolved request  is still in the array, it may be rendered (URL may be updated)
      await next(shallow)
    }

    return undefined
  },
  200,
  // the maxWait is now set to a somewhat shorter time than the average query time.
  { leading: true, maxWait: 700, trailing: true },
)

/**
 * - Handles shallow routing requests
 * - Handles customer specific product list queries
 */
export function useProductList<
  T extends ProductListQuery &
    ProductFiltersQuery & {
      params?: ProductListParams
      category?: CategoryDefaultFragment | null | undefined
    },
>(props: T) {
  const { category } = props
  const { params, shallow } = useRouterFilterParams(props)
  const variables = useProductListApplyCategoryDefaults(params, category)

  const result = useInContextQuery(ProductListDocument, { variables, skip: !shallow }, props)
  const filters = useInContextQuery(
    ProductFiltersDocument,
    { variables: categoryDefaultsToProductListFilters(variables), skip: !shallow },
    props,
  )

  const storeConfig = useQuery(StoreConfigDocument).data

  const handleSubmit: NonNullable<FilterFormProviderProps['handleSubmit']> = useEventCallback(
    async (formValues, next) => {
      if (!storeConfig) return

      const vars = await productListApplyCategoryDefaults(
        toProductListParams(formValues),
        storeConfig,
        category,
      )

      const shallowNow =
        JSON.stringify(vars.filters?.category_uid) === JSON.stringify(params?.filters.category_uid)
      await prefetchProductList(
        vars,
        categoryDefaultsToProductListFilters(vars),
        next,
        result.client,
        shallowNow,
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
