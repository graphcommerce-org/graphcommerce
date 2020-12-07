import { ApolloClient, ApolloQueryResult, NormalizedCacheObject } from '@apollo/client'
import {
  FilterEqualTypeInput,
  FilterMatchTypeInput,
  FilterRangeTypeInput,
  SortEnum,
} from '@reachdigital/magento-graphql'
import {
  ProductListDocument,
  ProductListQuery,
} from '@reachdigital/magento-product/ProductList.gql'
import { ProductListParams } from '@reachdigital/magento-product/ProductListItems/filterTypes'
import { ResolveUrlQuery } from '@reachdigital/magento-store/ResolveUrl.gql'
import ResultError from '@reachdigital/next-ui/Page/ResultError'
import { PromiseValue } from 'type-fest'
import { CategoryPageDocument } from './CategoryPage.gql'
import getFilterTypes from './getFilterTypes'

async function parseParams(
  url: string,
  query: string[],
  filterTypes: ReturnType<typeof getFilterTypes>,
) {
  const categoryVariables: ProductListParams = { url, filters: {}, sort: {} }

  const typeMap = await filterTypes

  query.reduce<string | undefined>((param, value) => {
    // We parse everything in pairs, every second loop we parse
    if (!param) return value

    if (param === 'page') {
      categoryVariables.currentPage = Number(value)
      return undefined
    }
    if (param === 'limit') {
      categoryVariables.pageSize = Number(param)
      return undefined
    }
    if (param === 'sort') {
      categoryVariables.sort[value] = 'ASC'
      return undefined
    }
    if (param === 'dir') {
      const [sortBy] = Object.keys(categoryVariables.sort)
      if (sortBy) categoryVariables.sort[sortBy] = value as SortEnum
      return undefined
    }

    const [from, to] = value.split('-')
    switch (typeMap[param]) {
      case 'FilterMatchTypeInput':
        categoryVariables.filters[param] = { match: value } as FilterMatchTypeInput
        return undefined
      case 'FilterRangeTypeInput':
        categoryVariables.filters[param] = {
          ...(from !== '*' && { from }),
          ...(to !== '*' && { to }),
        } as FilterRangeTypeInput
        return undefined
      case 'FilterEqualTypeInput':
        categoryVariables.filters[param] = { in: value.split(',') } as FilterEqualTypeInput
        return undefined
    }

    throw new ResultError({ notFound: true })
  }, undefined)

  return categoryVariables
}

// function assertAllowedParams(params: ProductListParams, productList: ProductListQuery) {
//   const aggregations = productList.filters?.aggregations

//   Object.entries(params.filters).forEach(([key, val]) => {
//     const found = aggregations?.some(
//       (aggregation) =>
//         aggregation?.attribute_code === key &&
//         aggregation.options?.some((option) => {

//           console.log(val, option?.value)
//           return option?.value === val
//         }),
//     )
//     console.log(found, key, val)
//   })
// }

type GetCategoryPagePropsArguments = {
  urlPath: string
  urlParams: string[]
  resolveUrl: Promise<ApolloQueryResult<ResolveUrlQuery>>
}

const getCategoryPageProps = async (
  { urlPath, urlParams, resolveUrl }: GetCategoryPagePropsArguments,
  client: ApolloClient<NormalizedCacheObject>,
) => {
  const filterTypes = getFilterTypes(client)

  const category = client.query({ query: CategoryPageDocument, variables: { urlPath } })

  const params = parseParams(urlPath, urlParams, filterTypes)

  const rootCategory = String((await resolveUrl).data.urlResolver?.id ?? 0)
  const products = client.query({
    query: ProductListDocument,
    variables: {
      ...(await params),
      filters: { category_id: { eq: rootCategory }, ...(await params).filters },
      rootCategory,
    },
  })

  // assertAllowedParams(await params, (await products).data)
  return {
    ...(await category).data,
    ...(await products).data,
    params: await params,
    filterTypes: await filterTypes,
  }
}

export default getCategoryPageProps

export type CategoryPageProps = PromiseValue<ReturnType<typeof getCategoryPageProps>>
