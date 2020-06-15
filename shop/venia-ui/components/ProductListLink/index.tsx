import React, { PropsWithChildren } from 'react'
import { LinkProps, Link } from '@material-ui/core'
import NextLink from 'next/link'
import { ProductListParams } from '../ProductList'

type ProductListLinkParams = PropsWithChildren<LinkProps & ProductListParams>

export function ProductListLink(props: ProductListLinkParams) {
  const { children, url, sort, currentPage, pageSize, filters, search, ...linkProps } = props

  let href = `/shop/browse/${url}`

  if (currentPage) href += `/page/${currentPage}`

  const [sortBy] = Object.keys(sort)
  if (sortBy) {
    href += `/sort/${sortBy}`
    if (sort[sortBy] === 'DESC') href += `/dir/desc`
  }

  Object.entries(filters).forEach(([param, value]) => {
    if (param === 'category_id') return
    if (value?.eq) href += `/${param}/${value.eq}`
  })

  return (
    <NextLink href='/shop/browse/[...url]' as={href} passHref>
      <Link rel='nofollow' {...linkProps}>
        {children}
      </Link>
    </NextLink>
  )
}
