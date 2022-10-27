import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Breadcrumbs, BreadcrumbsProps, Container, Link, Typography } from '@mui/material'
import PageLink from 'next/link'
import { CategoryBreadcrumbFragment } from './CategoryBreadcrumb.gql'

type CategoryPageBreadcrumbsProps = CategoryBreadcrumbFragment & Omit<BreadcrumbsProps, 'children'>

export function CategoryBreadcrumb(props: CategoryPageBreadcrumbsProps) {
  const { breadcrumbs, name, ...breadcrumbsProps } = props

  return (
    <Breadcrumbs {...breadcrumbsProps}>
      <PageLink href='/' passHref>
        <Link underline='hover' color='inherit'>
          <Trans id='Home' />
        </Link>
      </PageLink>
      {filterNonNullableKeys(breadcrumbs, ['category_level'])
        .sort((a, b) => a.category_level - b.category_level)
        .map((breadcrumb, i) => (
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
