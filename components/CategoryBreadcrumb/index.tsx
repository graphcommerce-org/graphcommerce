import React from 'react'
import { Link, Breadcrumbs, Typography, BreadcrumbsProps } from '@material-ui/core'

type CategoryBreadcrumbProps = GQLCategoryBreadcrumbFragment & BreadcrumbsProps

export default function CategoryBreadcrumb(props: CategoryBreadcrumbProps) {
  const { name, breadcrumbs, ...breadcrumbProps } = props
  return (
    <Breadcrumbs aria-label='breadcrumb' {...breadcrumbProps}>
      <Link color='inherit' href='/'>
        Home
      </Link>
      {breadcrumbs &&
        breadcrumbs.map(({ category_id, category_name, category_url_path }) => (
          <Link color='inherit' href={category_url_path} key={category_id}>
            {category_name}
          </Link>
        ))}
      <Typography color='textPrimary'>{name}</Typography>
    </Breadcrumbs>
  )
}
