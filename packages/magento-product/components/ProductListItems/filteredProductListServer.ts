import type {
  FilterEqualTypeInput,
  FilterRangeTypeInput,
  SortEnum,
} from '@graphcommerce/graphql-mesh'
import type { ProductListParams } from './filterTypes'
import type { FilterTypes } from './getFilterTypes'

export function parseParams(
  url: string,
  query: string[],
  filterTypes: FilterTypes,
  search: string | null = null,
): ProductListParams | undefined {
  const productListParams: ProductListParams = {
    url,
    filters: {},
    sort: {},
    search: search ? decodeURIComponent(search) : null,
  }

  const typeMap = filterTypes

  let error = false
  query.map(decodeURI).reduce<string | undefined>((param, value) => {
    // We parse everything in pairs, every second loop we parse
    if (!param || param === 'q') return value

    if (param === 'page') {
      productListParams.currentPage = Number(value)
      return undefined
    }
    if (param === 'page-size') {
      productListParams.pageSize = Number(value)
      return undefined
    }
    if (param === 'sort') {
      productListParams.sort[value] = 'ASC'
      return undefined
    }
    if (param === 'dir') {
      const [sortBy] = Object.keys(productListParams.sort)
      if (sortBy) productListParams.sort[sortBy] = value?.toUpperCase() as SortEnum
      return undefined
    }
    if (param === 'category_uid') {
      productListParams.filters.category_uid = { in: [value] }
      return undefined
    }

    const [from, to] = value.split('-')
    switch (typeMap[param]) {
      case 'BOOLEAN':
      case 'SELECT':
      case 'MULTISELECT':
        productListParams.filters[param] = { in: value.split(',') } as FilterEqualTypeInput
        return undefined
      case 'PRICE':
        productListParams.filters[param] = {
          ...(from !== '*' && { from }),
          ...(to !== '*' && { to }),
        } as FilterRangeTypeInput
        return undefined
    }

    // console.log('Filter not recognized', param, typeMap[param])
    error = true
    return undefined
  }, undefined)

  return error ? undefined : productListParams
}

export function extractUrlQuery(params?: { url: string[] }) {
  if (!params?.url) return [undefined, undefined] as const

  const queryIndex = params.url.findIndex((slug) => slug === 'q' || slug === 'page')
  const qIndex = queryIndex < 0 ? params.url.length : queryIndex
  const url = params.url.slice(0, qIndex).join('/')
  const query = params.url.slice(qIndex)

  if (queryIndex > 0 && !query.length) return [undefined, undefined] as const
  return [url, query] as const
}
