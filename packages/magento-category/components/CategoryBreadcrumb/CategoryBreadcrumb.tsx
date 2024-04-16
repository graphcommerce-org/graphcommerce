import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { Breadcrumbs, filterNonNullableKeys } from '@graphcommerce/next-ui'
import { BreadcrumbsProps } from '@mui/material'
import { useMemo } from 'react'
import { CategoryBreadcrumbFragment } from './CategoryBreadcrumb.gql'

type CategoryPageBreadcrumbsProps = CategoryBreadcrumbFragment &
  Omit<BreadcrumbsProps, 'children'> & { breadcrumbsAmount?: number }

export function CategoryBreadcrumb(props: CategoryPageBreadcrumbsProps) {
  const { breadcrumbs, name, uid, url_path, ...breadcrumbsProps } = props
  const config = useQuery(StoreConfigDocument).data?.storeConfig
  const baseUrl = config?.secure_base_link_url ?? import.meta.graphCommerce.canonicalBaseUrl
  const showBreadcrumbs = import.meta.graphCommerce?.breadcrumbs

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

  if (!showBreadcrumbs) return null

  return (
    <Breadcrumbs
      breadcrumbs={breadcrumbsList}
      name={name}
      baseUrl={baseUrl}
      {...breadcrumbsProps}
    />
  )
}
