import { Breadcrumbs, PopperBreadcrumbs, filterNonNullableKeys } from '@graphcommerce/next-ui'
import { BreadcrumbsProps } from '@mui/material'
import { useMemo } from 'react'
import { CategoryBreadcrumbFragment } from './CategoryBreadcrumb.gql'

type CategoryPageBreadcrumbsProps = CategoryBreadcrumbFragment & Omit<BreadcrumbsProps, 'children'>

export function CategoryBreadcrumb(props: CategoryPageBreadcrumbsProps) {
  const { breadcrumbs, name, ...breadcrumbsProps } = props

  const breadcrumbsList = useMemo(
    () =>
      filterNonNullableKeys(breadcrumbs, ['category_level'])
        .sort((a, b) => a.category_level - b.category_level)
        .map((breadcrumb) => ({
          underline: 'hover' as const,
          key: breadcrumb.category_uid,
          color: 'inherit',
          href: `/${breadcrumb.category_url_path}`,
          children: breadcrumb.category_name,
        })),
    [breadcrumbs],
  )

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbsList} name={name} {...breadcrumbsProps} />
      <PopperBreadcrumbs breadcrumbs={breadcrumbsList} name={name} {...breadcrumbsProps} />
    </>
  )
}
