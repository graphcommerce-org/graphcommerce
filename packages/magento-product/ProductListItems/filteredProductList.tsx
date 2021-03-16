import {
  FilterEqualTypeInput,
  FilterMatchTypeInput,
  FilterRangeTypeInput,
  SortEnum,
} from '@reachdigital/magento-graphql'
import { FilterTypes, ProductListParams } from './filterTypes'

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

export function extractUrlQuery(params?: { url: string[] }) {
  if (!params) return [undefined, undefined] as const

  const queryIndex = params.url.findIndex((slug) => slug === 'q')
  const qIndex = queryIndex < 0 ? params.url.length : queryIndex
  const url = params.url.slice(0, qIndex).join('/')
  const query = params.url.slice(qIndex + 1)

  if (queryIndex > 0 && !query.length) return [undefined, undefined] as const
  return [url, query] as const
}
