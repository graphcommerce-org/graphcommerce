import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import {
  FilterTypes,
  ProductFiltersQuery,
  ProductListParams,
  ProductListQuery,
} from '@graphcommerce/magento-product'
import {
  extractUrlQuery,
  getFilterTypes,
  parseParams,
  productFilters,
  productList,
} from '@graphcommerce/magento-product/server'
import { GetStaticPropsContext } from 'next'
import { CategorySearchDocument, CategorySearchQuery } from '../CategorySearch.gql'

export type ProductListContext = {
  params: false | ProductListParams
  filterTypes: FilterTypes
}

export async function searchContext(
  context: GetStaticPropsContext<{ url: string[] }>,
): Promise<ProductListContext> {
  const [searchShort = '', query = []] = extractUrlQuery(context.params)
  const search = searchShort.length >= 3 ? searchShort : ''

  const filterTypes = getFilterTypes()

  return {
    filterTypes: await filterTypes,
    params: parseParams(search ? `search/${search}` : 'search', query, await filterTypes, search),
  }
}

export type SearchPageProps = CategorySearchQuery & ProductListQuery & ProductFiltersQuery

type SearchPagePropsReturn = Promise<false | SearchPageProps>

export async function searchResults(context: Promise<ProductListContext>): SearchPagePropsReturn {
  const { params } = await context
  if (!params) return false

  const filters = productFilters({ search: params.search })
  const products = productList({ ...params })
  const categories = params.search
    ? graphqlQuery(CategorySearchDocument, { variables: { search: params.search } })
    : undefined

  if ((await products).errors) return false

  return {
    ...(await products).data,
    ...(await filters).data,
    ...(await categories)?.data,
  } satisfies SearchPageProps
}
