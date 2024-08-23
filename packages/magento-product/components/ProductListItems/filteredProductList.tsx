import type {
  FilterEqualTypeInput,
  FilterRangeTypeInput,
  SortEnum,
} from '@graphcommerce/graphql-mesh'
// eslint-disable-next-line import/no-extraneous-dependencies
import { equal } from '@wry/equality'
import { useRouter } from 'next/router'
import { ProductListParams } from './filterTypes'
import { FilterTypes } from './getFilterTypes'

export function parseParams(
  url: string,
  query: string[],
  filterTypes: FilterTypes,
  search: string | null = null,
): ProductListParams | undefined {
  const productListParams: ProductListParams = { url, filters: {}, sort: {}, search }

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
      productListParams.filters.category_uid = { eq: value }
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

export function useRouterFilterParams(props: {
  filterTypes?: FilterTypes | undefined
  params?: ProductListParams
}) {
  const { filterTypes, params } = props
  const router = useRouter()

  const path = router.asPath.startsWith('/c/') ? router.asPath.slice(3) : router.asPath.slice(1)
  const [url, query] = extractUrlQuery({ url: path.split('#')[0].split('/') })
  if (!url || !query || !filterTypes) return { params, shallow: false }

  const searchParam = url.startsWith('search') ? decodeURI(url.split('/')[1] ?? '') : null
  const clientParams = parseParams(url, query, filterTypes, searchParam)

  if (clientParams && !clientParams?.filters.category_uid && params?.filters.category_uid)
    clientParams.filters.category_uid = params?.filters.category_uid

  return { params: clientParams, shallow: !equal(params, clientParams) }
}
