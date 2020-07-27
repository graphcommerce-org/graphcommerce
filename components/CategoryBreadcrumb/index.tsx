import React from 'react'
import { Link as MuiLink, Breadcrumbs, Typography, BreadcrumbsProps } from '@material-ui/core'
import Link from 'next/link'

type CategoryBreadcrumbProps = GQLCategoryBreadcrumbFragment & BreadcrumbsProps

export default function CategoryBreadcrumb(props: CategoryBreadcrumbProps) {
  const { name, breadcrumbs, ...breadcrumbProps } = props
  return (
    <Breadcrumbs aria-label='breadcrumb' {...breadcrumbProps}>
      <Link href='/' passHref>
        <MuiLink color='inherit'>Home</MuiLink>
      </Link>
      {breadcrumbs?.map((breadcrumb) => {
        if (
          !breadcrumb ||
          !breadcrumb.category_id ||
          !breadcrumb.category_url_path ||
          !breadcrumb.category_name
        )
          return null

        return (
          <Link
            href='/[...url]'
            as={`/${breadcrumb.category_url_path}`}
            key={breadcrumb.category_id}
            passHref
          >
            <MuiLink color='inherit'>{breadcrumb.category_name}</MuiLink>
          </Link>
        )
      })}
      <Typography color='textPrimary'>{name}</Typography>
    </Breadcrumbs>
  )
}
