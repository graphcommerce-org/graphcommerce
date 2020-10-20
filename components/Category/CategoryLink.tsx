import { Link, LinkProps } from '@material-ui/core'
import { useProductListParamsContext } from 'components/Category/CategoryPageContext'
import PageLink from 'components/PageTransition/PageLink'
import Router from 'next/router'
import React, { PropsWithChildren } from 'react'
import {
  ProductListParams,
  isFilterTypeEqual,
  isFilterTypeMatch,
  isFilterTypeRange,
} from '../Product/ProductListItems/filterTypes'

function createCategoryLink(props: ProductListParams): string {
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

export function useCategoryLink(props: ProductListParams): string {
  return createCategoryLink({ ...props, url: `${props.url}` })
}

export type CategoryLinkProps = PropsWithChildren<
  LinkProps & ProductListParams & { noLink?: boolean }
>

const CategoryLink = React.forwardRef<HTMLAnchorElement, CategoryLinkProps>((props, ref) => {
  const { setParams } = useProductListParamsContext()
  const {
    children,
    url,
    sort,
    currentPage,
    pageSize,
    filters,
    search,
    noLink,
    ...linkProps
  } = props
  const newParams = { filters, sort, url, currentPage, pageSize, search }

  const categoryLink = useCategoryLink(newParams)
  const updateParams = () => setParams(newParams)

  // We're setting nofollow if a custom sort, pageSize, filters or search is set.
  let rel: string | undefined
  if (Object.keys(sort).length || pageSize || Object.keys(filters).length || search)
    rel = 'nofollow'

  return (
    <PageLink href={categoryLink}>
      {noLink ? (
        children
      ) : (
        <Link rel={rel} {...linkProps} ref={ref} onClick={updateParams}>
          {children}
        </Link>
      )}
    </PageLink>
  )
})

export default CategoryLink

export const useCategoryPushRoute = () => {
  const { setParams } = useProductListParamsContext()

  return (params: ProductListParams) => {
    setParams(params)

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Router.push('/[...url]', `${createCategoryLink(params)}`)
  }
}
