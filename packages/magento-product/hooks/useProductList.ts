import { ApolloQueryResult, ApolloClient, useQuery } from '@graphcommerce/graphql'
import { CustomerTokenDocument, useSessionScopeQuery } from '@graphcommerce/magento-customer'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { showPageLoadIndicator } from '@graphcommerce/next-ui'
import { debounce } from '@graphcommerce/ecommerce-ui'
import { useEventCallback } from '@mui/material'
import { FilterFormProviderProps } from '../components'
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
  useProductListApplyCategoryDefaults,
} from '../components/ProductListItems/productListApplyCategoryDefaults'

const productListQueries: Array<Promise<ApolloQueryResult<ProductListQuery>>> = []

type Next = Parameters<NonNullable<FilterFormProviderProps['handleSubmit']>>[1]

export const prefetchProductList = debounce(
  async (
    variables: ProductListQueryVariables,
    next: Next,
    client: ApolloClient<unknown>,
    shallow: boolean,
  ) => {
    showPageLoadIndicator.set(true)

    const promise = client.query({
      query: ProductListDocument,
      variables: {
        ...variables,
        sessionScope: {
          loggedIn: !!client.cache.readQuery({ query: CustomerTokenDocument })?.customerToken
            ?.token,
        },
      },
    })

    // Push the query to the queue array.
    productListQueries.push(promise)

    // Since we're waiting here the form will be submitting for longer.
    await promise

    const includes = productListQueries.includes(promise)

    // Remove all requests that are before the current request
    const index = productListQueries.indexOf(promise)
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
  T extends ProductListQuery & {
    params?: ProductListParams
    category?: CategoryDefaultFragment | null | undefined
  },
>(props: T) {
  const { category } = props
  const { params, shallow } = useRouterFilterParams(props)
  const variables = useProductListApplyCategoryDefaults(params, category)

  const result = useSessionScopeQuery(ProductListDocument, { variables, skip: !shallow }, props)
  const storeConfig = useQuery(StoreConfigDocument).data

  const handleSubmit: NonNullable<FilterFormProviderProps['handleSubmit']> = useEventCallback(
    async (formValues, next) => {
      if (!storeConfig) return

      const vars = {
        ...(await productListApplyCategoryDefaults(
          toProductListParams(formValues),
          storeConfig,
          category,
        )),
        sessionScope: {
          loggedIn: !!result.client.cache.readQuery({ query: CustomerTokenDocument })?.customerToken
            ?.token,
        },
      }
      console.log(
        JSON.stringify(vars.filters?.category_uid) === JSON.stringify(params?.filters.category_uid),
      )

      await prefetchProductList(
        vars,
        next,
        result.client,
        JSON.stringify(vars.filters?.category_uid) === JSON.stringify(params?.filters.category_uid),
      )
    },
  )

  return {
    ...props,
    ...result.data,
    params,
    mask: result.mask,
    handleSubmit,
  }
}
