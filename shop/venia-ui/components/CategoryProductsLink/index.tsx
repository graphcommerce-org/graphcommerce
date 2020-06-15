import React, { PropsWithChildren } from 'react'
import Link from 'components/Link'
import { LinkProps } from '@material-ui/core'

type CategoryProductsLinkProps = PropsWithChildren<
  LinkProps & { variables: GQLCategoryProductsQueryVariables; url: string[] }
>

export function CategoryProductsLink({ children, url, variables }: CategoryProductsLinkProps) {
  const { sort = {} } = variables

  let href = `/shop/browse/${url.join('/')}`

  const [sortBy] = Object.keys(sort)
  if (sortBy) {
    href += `/sort/${sortBy}`
    if (sort[sortBy] === 'DESC') href += `/dir/desc`
  }

  return (
    <Link href={href} metaRobots='NOINDEX_NOFOLLOW'>
      {children}
    </Link>
  )
}
