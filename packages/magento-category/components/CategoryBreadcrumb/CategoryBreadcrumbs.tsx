import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { Breadcrumbs, filterNonNullableKeys, useStorefrontConfig } from '@graphcommerce/next-ui'
import { BreadcrumbsProps } from '@mui/material'
import { useMemo } from 'react'
import { CategoryBreadcrumbFragment } from './CategoryBreadcrumb.gql'

export type CategoryBreadcrumbsProps = Omit<BreadcrumbsProps, 'children'> & {
  breadcrumbsAmount?: number
  category: CategoryBreadcrumbFragment
}

export function CategoryBreadcrumbs(props: CategoryBreadcrumbsProps) {
  const { category, ...breadcrumbsProps } = props
  const { breadcrumbs, name, uid, url_path } = category

  const breadcrumbsList = [
    ...filterNonNullableKeys(breadcrumbs, ['category_level'])
      .sort((a, b) => a.category_level - b.category_level)
      .map((breadcrumb) => ({
        underline: 'hover' as const,
        key: breadcrumb.category_uid,
        color: 'inherit',
        href: `/${breadcrumb.category_url_path}`,
        children: breadcrumb.category_name,
      })),
    {
      underline: 'hover' as const,
      key: uid,
      color: 'inherit',
      href: `/${url_path}`,
      children: name,
    },
  ]

  return <Breadcrumbs breadcrumbs={breadcrumbsList} name={name} {...breadcrumbsProps} />
}
