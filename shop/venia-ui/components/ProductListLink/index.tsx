import React, { PropsWithChildren } from 'react'
import { LinkProps, Link } from '@material-ui/core'
import NextLink from 'next/link'

type CategoryProductsLinkProps = PropsWithChildren<
  LinkProps & { variables: GQLCategoryProductsQueryVariables; url: string[] }
>

export function ProductListLink({
  children,
  url,
  variables,
  ...linkProps
}: CategoryProductsLinkProps) {
  const { sort = {}, currentPage } = variables

  let href = `/shop/browse/${url.join('/')}`

  if (currentPage) href += `/page/${currentPage}`

  const [sortBy] = Object.keys(sort)
  if (sortBy) {
    href += `/sort/${sortBy}`
    if (sort[sortBy] === 'DESC') href += `/dir/desc`
  }

  return (
    <NextLink href='/shop/browse/[...url]' as={href}>
      <Link rel='nofollow' {...linkProps}>
        {children}
      </Link>
    </NextLink>
  )
}
