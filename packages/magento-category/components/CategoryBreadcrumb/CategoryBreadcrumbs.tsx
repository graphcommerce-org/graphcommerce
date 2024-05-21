import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { Breadcrumbs, BreadcrumbsType, filterNonNullableKeys } from '@graphcommerce/next-ui'
import { BreadcrumbsProps } from '@mui/material'
import { useMemo } from 'react'
import { CategoryBreadcrumbFragment } from './CategoryBreadcrumb.gql'

export type CategoryBreadcrumbsProps = CategoryBreadcrumbFragment &
  Omit<BreadcrumbsProps, 'children'> &
  Omit<BreadcrumbsType, 'breadcrumbs'>

export function CategoryBreadcrumbs(props: CategoryBreadcrumbsProps) {
  const { breadcrumbs, name, uid, url_path, ...breadcrumbsProps } = props
  const config = useQuery(StoreConfigDocument).data?.storeConfig
  const baseUrl = config?.secure_base_link_url ?? import.meta.graphCommerce.canonicalBaseUrl

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
    <Breadcrumbs
      breadcrumbs={breadcrumbsList}
      name={name}
      baseUrl={baseUrl}
      {...breadcrumbsProps}
    />
  )
}
