import { Breadcrumbs, PopperBreadcrumbs, filterNonNullableKeys } from '@graphcommerce/next-ui'
import { BreadcrumbsProps } from '@mui/material'
import { useMemo } from 'react'
import { CategoryBreadcrumbFragment } from './CategoryBreadcrumb.gql'

type CategoryPageBreadcrumbsProps = CategoryBreadcrumbFragment & Omit<BreadcrumbsProps, 'children'>

export function CategoryBreadcrumb(props: CategoryPageBreadcrumbsProps) {
  const { breadcrumbs, level, name, uid, url_path, ...breadcrumbsProps } = props

  const breadcrumbsList = useMemo(() => {
    const categoryItem = [
      {
        underline: 'hover' as const,
        key: uid,
        color: 'inherit',
        href: `/${url_path}`,
        children: name,
      },
    ]

    const sortedBreadcrumbsList = filterNonNullableKeys(breadcrumbs, ['category_level'])
      .sort((a, b) => a.category_level - b.category_level)
      .map((breadcrumb) => ({
        underline: 'hover' as const,
        key: breadcrumb.category_uid,
        color: 'inherit',
        href: `/${breadcrumb.category_url_path}`,
        children: breadcrumb.category_name,
      }))

    sortedBreadcrumbsList.push(...categoryItem)

    return sortedBreadcrumbsList
  }, [breadcrumbs, name, uid, url_path])

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbsList} {...breadcrumbsProps} />
      <PopperBreadcrumbs breadcrumbs={breadcrumbsList} {...breadcrumbsProps} />
    </>
  )
}
