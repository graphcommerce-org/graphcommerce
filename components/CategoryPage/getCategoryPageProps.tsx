import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import getFilterTypeMap from 'components/CategoryPage/getFilterTypeMap'
import { ProductListParams } from 'components/ProductListItems/filterTypes'
import getUrlResolveProps from 'components/ShopLayout/getUrlResolveProps'
import {
  GQLSortEnum,
  GQLFilterEqualTypeInput,
  GQLFilterMatchTypeInput,
  GQLFilterRangeTypeInput,
  CategoryPageDocument,
  ProductListDocument,
} from 'generated/graphql'
import { PromiseValue } from 'type-fest'

async function parseParams(
  url: string,
  query: string[],
  filterTypeMap: ReturnType<typeof getFilterTypeMap>,
) {
  const categoryVariables: ProductListParams = { url, filters: {}, sort: {} }

  const typeMap = await filterTypeMap
  query.reduce<string | undefined>((param, value) => {
    // We parse everything in pairs, every second loop we parse
    if (!param) return value

    if (param === 'page') categoryVariables.currentPage = Number(value)
    if (param === 'size') categoryVariables.pageSize = Number(param)
    if (param === 'sort') categoryVariables.sort[value] = 'ASC'
    if (param === 'dir') {
      const [sortBy] = Object.keys(categoryVariables.sort)
      if (sortBy) categoryVariables.sort[sortBy] = value as GQLSortEnum
    }

    const [from, to] = value.split('-')
    switch (typeMap[param]) {
      case 'FilterEqualTypeInput':
        categoryVariables.filters[param] = { in: value.split(',') } as GQLFilterEqualTypeInput
        break
      case 'FilterMatchTypeInput':
        categoryVariables.filters[param] = { match: value } as GQLFilterMatchTypeInput
        break
      case 'FilterRangeTypeInput':
        categoryVariables.filters[param] = {
          ...(from !== '*' && { from }),
          ...(to !== '*' && { to }),
        } as GQLFilterRangeTypeInput
        break
    }

    return undefined
  }, undefined)

  return categoryVariables
}

type GetCategoryPagePropsArguments = {
  url: string[]
  urlParams: string[]
  urlResolve: ReturnType<typeof getUrlResolveProps>
}

const getCategoryPageProps = async (
  { url, urlParams, urlResolve }: GetCategoryPagePropsArguments,
  client: ApolloClient<NormalizedCacheObject>,
) => {
  const filterTypeMap = getFilterTypeMap(client)

  const rootCategory = String((await urlResolve).urlResolver?.id)
  const category = client.query({ query: CategoryPageDocument, variables: { id: rootCategory } })

  const params = parseParams(url.join('/'), urlParams, filterTypeMap)

  const products = client.query({
    query: ProductListDocument,
    variables: {
      ...(await params),
      filters: { category_id: { eq: rootCategory }, ...(await params).filters },
      rootCategory,
    },
  })

  const categoryData = (await category).data
  const productsData = (await products).data

  if (!categoryData) throw new Error('Could not fetch category')
  if (!productsData) throw new Error('Could not fetch category products')

  return {
    ...categoryData,
    ...productsData,
    params: await params,
    filterTypeMap: await filterTypeMap,
  }
}

export default getCategoryPageProps

export type GetCategoryPageProps = PromiseValue<ReturnType<typeof getCategoryPageProps>>
