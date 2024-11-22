import type {
  ProductFilterParams,
  ProductListParams,
} from '../components/ProductListItems/filterTypes'
import {
  isFilterTypeEqual,
  isFilterTypeMatch,
  isFilterTypeRange,
  toFilterParams,
} from '../components/ProductListItems/filterTypes'

export function productListLinkFromFilter(props: ProductFilterParams): string {
  const { url, sort, dir, currentPage, pageSize, filters: incoming, search } = props
  const isSearch = url.startsWith('search')
  const filters = isSearch ? incoming : { ...incoming, category_uid: undefined }
  const uid = incoming?.category_uid?.eq || incoming?.category_uid?.in?.[0]

  let urlBase = url
  if (isSearch) urlBase = search ? `search/${search}` : 'search'

  // base url path generation
  let paginateSort = ''
  let query = ''

  if (currentPage && currentPage > 1) paginateSort += `/page/${currentPage}`

  // todo(paales): How should the URL look like with multiple sorts?
  // Something like: /sort/position,price/dir/asc,asc
  if (sort) query += `/sort/${sort}`
  if (dir) query += '/dir/desc'
  if (pageSize) query += `/page-size/${pageSize}`

  // Apply filters
  if (filters)
    Object.entries(filters).forEach(([param, value]) => {
      if (!value) return
      if (isFilterTypeEqual(value) && value.in?.length)
        query += `/${param}/${value.in.sort()?.join(',')}`
      if (isFilterTypeEqual(value) && value.eq) query += `/${param}/${value.eq}`
      if (isFilterTypeMatch(value)) paginateSort += `/${param}/${value.match}`
      if (isFilterTypeRange(value)) query += `/${param}/${value.from ?? '*'}-${value.to ?? '*'}`
    })

  // it's a category with filters, use the /c/ route.
  if (query && !isSearch)
    return `/c/${urlBase}${paginateSort}/q${uid ? `/category_uid/${uid}` : ''}${query}`

  return query ? `/${urlBase}${paginateSort}/q${query}` : `/${urlBase}${paginateSort}`
}

export function productListLink(props: ProductListParams): string {
  return productListLinkFromFilter(toFilterParams(props))
}

export function useProductListLink(props: ProductListParams): string {
  return productListLink({ ...props, url: `${props.url}` })
}
