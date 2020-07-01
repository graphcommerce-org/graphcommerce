import React, { PropsWithChildren } from 'react'
import { LinkProps, Link } from '@material-ui/core'
import NextLink from 'next/link'
import {
  ProductListParams,
  isFilterTypeEqual,
  isFilterTypeMatch,
  isFilterTypeRange,
} from '../ProductList'

export type CategoryLinkProps = PropsWithChildren<LinkProps & ProductListParams>

export function createRoute(props: ProductListParams): string {
  const { url, sort, currentPage, filters } = props

  // base url path generation
  let href = ``

  if (currentPage && currentPage > 1) href += `/page/${currentPage}`

  // todo(paales): How should the URL look like with multiple sorts?
  // Something like: /sort/position,price/dir/asc,asc
  const [sortBy] = Object.keys(sort)
  if (sortBy) href += `/sort/${sortBy}`
  if (sortBy && sort[sortBy] && sort[sortBy] === 'DESC') href += `/dir/desc`

  // Apply filters
  Object.entries(filters).forEach(([param, value]) => {
    if (isFilterTypeEqual(value)) href += `/${param}/${value.in?.join(',')}`
    if (isFilterTypeMatch(value)) href += `/${param}/${value.match}`
    if (isFilterTypeRange(value)) href += `/${param}/${value.from ?? '*'}-${value.to ?? '*'}`
  })

  href = `/${url}${href && `/q${href}`}`
  return href
}

const CategoryLink = React.forwardRef<HTMLAnchorElement, CategoryLinkProps>((props, ref) => {
  const { children, url, sort, currentPage, pageSize, filters, search, ...linkProps } = props

  return (
    <NextLink href='/[...url]' as={createRoute(props)} passHref>
      <Link rel='nofollow' {...linkProps} ref={ref}>
        {children}
      </Link>
    </NextLink>
  )
})

export default CategoryLink
