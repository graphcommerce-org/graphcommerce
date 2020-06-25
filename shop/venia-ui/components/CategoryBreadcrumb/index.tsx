import React from 'react'
import { Link, Breadcrumbs, Typography } from '@material-ui/core'

export default function CategoryBreadcrumb(props: GQLCategoryBreadcrumbFragment) {
  const { name, breadcrumbs } = props
  return (
    <Breadcrumbs aria-label='breadcrumb'>
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
