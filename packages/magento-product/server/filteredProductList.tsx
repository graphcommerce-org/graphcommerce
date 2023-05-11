import type {
  FilterEqualTypeInput,
  FilterMatchTypeInput,
  FilterRangeTypeInput,
  SortEnum,
} from '@graphcommerce/graphql-mesh'
import { urlFromParams } from '@graphcommerce/next-ui/server'
import { ParsedUrlQuery } from 'querystring'
import { FilterTypes, ProductListParams } from '../components/ProductListItems/filterTypes'

export function parseParams(
  url: string,
  query: string[],
  filterTypes: FilterTypes,
  search: string | null = null,
): ProductListParams {
  const categoryVariables: ProductListParams = { url, filters: {}, sort: {}, search }

  const typeMap = filterTypes

  let error = false
  query.reduce<string | undefined>((param, value) => {
    // We parse everything in pairs, every second loop we parse
    if (!param || param === 'q') return value

    if (param === 'page') {
      categoryVariables.currentPage = Number(value)
      return undefined
    }
    if (param === 'page-size') {
      categoryVariables.pageSize = Number(value)
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

  return error ? { url, filters: {}, sort: {}, search } : categoryVariables
}

export function extractUrlQuery(params?: ParsedUrlQuery) {
  const from = urlFromParams(params)
  const reqUrl = from.split('/').filter((v) => v)

  if (!params?.url) return [undefined, undefined] as const

  const queryIndex = reqUrl.findIndex((slug) => slug === 'q' || slug === 'page')
  const qIndex = queryIndex < 0 ? params.url.length : queryIndex
  const url = reqUrl.slice(0, qIndex).join('/')
  const query = reqUrl.slice(qIndex)

  if (queryIndex > 0 && !query.length) return [undefined, undefined] as const
  return [url, query] as const
}
