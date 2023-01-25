import {
  isFilterTypeEqual,
  isFilterTypeMatch,
  isFilterTypeRange,
  ProductListParams,
} from '../components/ProductListItems/filterTypes'

export function createProductListLink(props: ProductListParams): string {
  const { url, sort, currentPage, filters: incoming } = props
  const filters = { ...incoming, category_uid: undefined }
  const uid = incoming?.category_uid?.eq || incoming?.category_uid?.in?.[0]

  // base url path generation
  let paginateSort = ``
  let query = ``

  if (currentPage && currentPage > 1) paginateSort += `/page/${currentPage}`

  // todo(paales): How should the URL look like with multiple sorts?
  // Something like: /sort/position,price/dir/asc,asc
  const [sortBy] = Object.keys(sort)
  if (sort && sortBy) query += `/sort/${sortBy}`
  if (sort && sortBy && sort[sortBy] && sort[sortBy] === 'DESC') query += `/dir/desc`

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

  const result = query
    ? `/${url.startsWith('search') ? url : `c/${url}`}${paginateSort}/q${
        uid ? `/category_uid/${uid}` : ''
      }${query}`
    : `/${url}${paginateSort}`

  return result
}

export function useProductListLink(props: ProductListParams): string {
  return createProductListLink({ ...props, url: `${props.url}` })
}
