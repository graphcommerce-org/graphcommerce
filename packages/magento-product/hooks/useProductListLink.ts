import {
  isFilterTypeEqual,
  isFilterTypeMatch,
  isFilterTypeRange,
  ProductListParams,
} from '../components/ProductListItems/filterTypes'

export function createCategoryLink(props: ProductListParams): string {
  const { url, sort, currentPage, filters } = props

  // base url path generation
  let href = ``

  if (currentPage && currentPage > 1) href += `/page/${currentPage}`

  // todo(paales): How should the URL look like with multiple sorts?
  // Something like: /sort/position,price/dir/asc,asc
  const [sortBy] = Object.keys(sort)
  if (sort && sortBy) href += `/sort/${sortBy}`
  if (sort && sortBy && sort[sortBy] && sort[sortBy] === 'DESC') href += `/dir/desc`

  // Apply filters
  if (filters)
    Object.entries(filters).forEach(([param, value]) => {
      if (value && isFilterTypeEqual(value) && value.in?.length)
        href += `/${param}/${value.in?.join(',')}`
      if (value && isFilterTypeMatch(value)) href += `/${param}/${value.match}`
      if (value && isFilterTypeRange(value))
        href += `/${param}/${value.from ?? '*'}-${value.to ?? '*'}`
    })

  href = `/${url}${href && `/q${href}`}`
  return href
}

export function useProductListLink(props: ProductListParams): string {
  return createCategoryLink({ ...props, url: `${props.url}` })
}
