import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import type { BreadcrumbsProps } from '@mui/material'
import { Breadcrumbs, Link, Typography } from '@mui/material'
import type { CategoryBreadcrumbFragment } from './CategoryBreadcrumb.gql'

type CategoryPageBreadcrumbsProps = CategoryBreadcrumbFragment & Omit<BreadcrumbsProps, 'children'>

/**
 * @deprecated Please use CategoryBreadcrumbs
 */
export function CategoryBreadcrumb(props: CategoryPageBreadcrumbsProps) {
  const { breadcrumbs, name, ...breadcrumbsProps } = props

  return (
    <Breadcrumbs {...breadcrumbsProps}>
      <Link href='/' underline='hover' color='inherit'>
        <Trans id='Home' />
      </Link>
      {filterNonNullableKeys(breadcrumbs, ['category_level'])
        .sort((a, b) => a.category_level - b.category_level)
        .map((breadcrumb) => (
          <Link
            underline='hover'
            key={breadcrumb.category_uid}
            color='inherit'
            href={`/${breadcrumb.category_url_path}`}
          >
            {breadcrumb.category_name}
          </Link>
        ))}
      <Typography color='text.primary'>{name}</Typography>
    </Breadcrumbs>
  )
}
