import { graphqlQuery, mergeFetchResults } from '@graphcommerce/graphql-mesh'
import { storeConfig } from '@graphcommerce/magento-store/server'
import type { GraphQLError } from 'graphql'
import { ProductListContext } from '../components'
import { ProductListDocument, ProductListQuery } from '../components/ProductList/ProductList.gql'
import {
  ProductFiltersDocument,
  ProductFiltersQuery,
} from '../components/ProductListFilters/ProductFilters.gql'

export async function getProductListItems(
  context: Promise<ProductListContext> | ProductListContext,
) {
  return graphqlQuery(ProductListDocument, {
    variables: { pageSize: (await storeConfig()).grid_per_page ?? 24, ...(await context).params },
  })
}

export async function getProductListFilters(
  context: Promise<ProductListContext> | ProductListContext,
) {
  const {
    search,
    filters: { category_uid },
  } = (await context).params

  return graphqlQuery(ProductFiltersDocument, {
    variables: search ? { search } : { filters: { category_uid } },
  })
}

export type ProductListingResult = {
  errors: Promise<null | GraphQLError[]>
  products: Promise<ProductListQuery['products']>
  filters: Promise<ProductFiltersQuery['filters']>
}

/** Fetches the products and filters */
export function getProductList(
  context: Promise<ProductListContext> | ProductListContext,
): ProductListingResult {
  const list = getProductListItems(context)
  const filt = getProductListFilters(context)

  return {
    errors: Promise.all([list, filt]).then(async (values) => {
      const { errors } = await mergeFetchResults(...values)
      return errors?.length ? [...errors] : null
    }),
    products: list.then((res) => res.data.products),
    filters: filt.then((res) => res.data.filters),
  }
}
