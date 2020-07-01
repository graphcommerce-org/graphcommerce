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
      {breadcrumbs &&
        breadcrumbs.map(({ category_id, category_name, category_url_path }) => (
          <Link href='/[...url]' as={`/${category_url_path}`} key={category_id} passHref>
            <MuiLink color='inherit'>{category_name}</MuiLink>
          </Link>
        ))}
      <Typography color='textPrimary'>{name}</Typography>
    </Breadcrumbs>
  )
}
