import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Breadcrumbs, BreadcrumbsProps, Link, Typography } from '@mui/material'
import { CategoryBreadcrumbFragment } from './CategoryBreadcrumb.gql'

type CategoryPageBreadcrumbsProps = CategoryBreadcrumbFragment & Omit<BreadcrumbsProps, 'children'>

/**
 * @deprecated Please use CategoryBreadcrumbs
 */
export function CategoryBreadcrumb(props: CategoryPageBreadcrumbsProps) {
  const { breadcrumbs, name, ...breadcrumbsProps } = props

  return (
    <Breadcrumbs {...breadcrumbsProps}>
      <Link href='/' underline='hover' sx={{ color: 'inherit' }}>
        <Trans id='Home' />
      </Link>
      {filterNonNullableKeys(breadcrumbs, ['category_level'])
        .sort((a, b) => a.category_level - b.category_level)
        .map((breadcrumb) => (
          <Link
            underline='hover'
            key={breadcrumb.category_uid}
            href={`/${breadcrumb.category_url_path}`}
            sx={{ color: 'inherit' }}
          >
            {breadcrumb.category_name}
          </Link>
        ))}
      <Typography sx={{ color: 'text.primary' }}>{name}</Typography>
    </Breadcrumbs>
  )
}
