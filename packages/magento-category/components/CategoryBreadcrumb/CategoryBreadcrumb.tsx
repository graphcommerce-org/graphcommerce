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
      {breadcrumbs?.map((mapped_category, i) => (
        <Link
          underline='hover'
          key={mapped_category?.category_uid}
          color='inherit'
          href={`/${mapped_category?.category_url_path}`}
        >
          {mapped_category?.category_name}
        </Link>
      ))}
      <Typography color='text.primary'>{name}</Typography>
    </Breadcrumbs>
  )
}
