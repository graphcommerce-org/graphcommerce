import { usePrevPageRouter } from '@graphcommerce/framer-next-pages'
import { Breadcrumbs, PopperBreadcrumbs, filterNonNullableKeys } from '@graphcommerce/next-ui'
import { BreadcrumbsProps } from '@mui/material'
import { useMemo } from 'react'
import { productPageCategory } from '../ProductPageCategory/productPageCategory'
import { ProductPageBreadcrumbFragment } from './ProductPageBreadcrumb.gql'

type ProductPageBreadcrumbsProps = ProductPageBreadcrumbFragment &
  Omit<BreadcrumbsProps, 'children'>

export function ProductPageBreadcrumb(props: ProductPageBreadcrumbsProps) {
  const { categories, name, uid, url_key, ...breadcrumbsProps } = props
  const prev = usePrevPageRouter()

  const category =
    categories?.find((c) => `/${c?.url_path}` === prev?.asPath) ?? productPageCategory(props)

  const breadcrumbsList = useMemo(() => {
    const productItem = [
      {
        underline: 'hover' as const,
        key: uid,
        color: 'inherit',
        href: `/${url_key}`,
        children: name,
      },
    ]
    const categoryItem = category
      ? [
          {
            underline: 'hover' as const,
            key: category.uid,
            color: 'inherit',
            href: `/${category.url_path}`,
            children: category.name,
          },
        ]
      : []

    const sortedBreadcrumbsList = filterNonNullableKeys(category?.breadcrumbs, ['category_level'])
      .sort((a, b) => a.category_level - b.category_level)
      .map((breadcrumb) => ({
        underline: 'hover' as const,
        key: breadcrumb.category_uid,
        color: 'inherit',
        href: `/${breadcrumb.category_url_path}`,
        children: breadcrumb.category_name,
      }))

    sortedBreadcrumbsList.push(...categoryItem, ...productItem)

    return sortedBreadcrumbsList
  }, [category, name, uid, url_key])

  return (
    <>
      {import.meta.graphCommerce.breadcrumbs?.breadcrumbsVariant === 'POPPER' ? (
        <PopperBreadcrumbs breadcrumbs={breadcrumbsList} name={name} {...breadcrumbsProps} />
      ) : (
        <Breadcrumbs breadcrumbs={breadcrumbsList} name={name} {...breadcrumbsProps} />
      )}
    </>
  )
}
