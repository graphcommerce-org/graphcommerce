import { ApolloClient, ApolloError, NormalizedCacheObject } from '@apollo/client'
import getFilterTypes from '@reachdigital/magento-category/getFilterTypes'
import {
  FilterEqualTypeInput,
  FilterMatchTypeInput,
  FilterRangeTypeInput,
  SortEnum,
} from '@reachdigital/magento-graphql'
import graphqlErrorByCategory from '@reachdigital/magento-graphql/graphqlErrorByCategory'
import {
  FilterTypes,
  ProductListParams,
} from '@reachdigital/magento-product/ProductListItems/filterTypes'
import { PromiseValue } from 'type-fest'
import { ProductListDocument } from './ProductList.gql'

export function parseParams(
  url: string,
  query: string[],
  filterTypes: FilterTypes,
): ProductListParams | false {
  const categoryVariables: ProductListParams = { url, filters: {}, sort: {} }

  const typeMap = filterTypes

  let error = false
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

    error = true
    return undefined
  }, undefined)

  return error ? false : categoryVariables
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

export function extractUrlQuery(params?: { url: string[] }) {
  if (!params) return [undefined, undefined] as const

  const queryIndex = params.url.findIndex((slug) => slug === 'q')
  const qIndex = queryIndex < 0 ? params.url.length : queryIndex
  const url = params.url.slice(0, qIndex).join('/')
  const query = params.url.slice(qIndex + 1)

  if (queryIndex > 0 && !query.length) return [undefined, undefined] as const
  return [url, query] as const
}

type GetCategoryPageProps = {
  url: string
  query: string[]
  rootCategory: Promise<string>
  filterTypes: FilterTypes
  staticClient: ApolloClient<NormalizedCacheObject>
}

export default async function getFilteredProductList({
  url,
  query,
  rootCategory,
  filterTypes,
  staticClient: client,
}: GetCategoryPageProps) {
  const params = parseParams(url, query, filterTypes)

  if (!params || !(await rootCategory)) return undefined

  const products = client.query({
    query: ProductListDocument,
    variables: {
      ...params,
      filters: { category_uid: { eq: await rootCategory }, ...params.filters },
      rootCategory: await rootCategory,
    },
  })

  // assertAllowedParams(await params, (await products).data)
  return { ...(await products).data, params, filterTypes }
}

export type CategoryPageProps = PromiseValue<ReturnType<typeof getFilteredProductList>>
