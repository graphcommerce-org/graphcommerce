import { usePrevPageRouter } from '@graphcommerce/framer-next-pages'
import { PopperBreadcrumb } from '@graphcommerce/magento-category'
import { i18n } from '@lingui/core'
import { BreadcrumbsProps } from '@mui/material'
import { useMemo } from 'react'
import { productPageCategory } from '../ProductPageCategory/productPageCategory'
import { ProductPageBreadcrumbFragment } from './ProductPageBreadcrumb.gql'

type ProductPageBreadcrumbsProps = ProductPageBreadcrumbFragment &
  Omit<BreadcrumbsProps, 'children'>

export function ProductPagePopperBreadcrumb(props: ProductPageBreadcrumbsProps) {
  const { categories, uid, name, url_key, sx, ...breadcrumbProps } = props
  const prev = usePrevPageRouter()

  const category =
    categories?.find((c) => `/${c?.url_path}` === prev?.asPath) ?? productPageCategory(props)

  const composedBreadcrumbs = useMemo(
    () => [
      {
        category_uid: 'home',
        category_name: i18n._(/* i18n */ 'Home'),
        category_url_path: '',
        category_level: category?.breadcrumbs
          ? Number(category?.breadcrumbs[0]?.category_level) - 1
          : 0,
      },
      ...(category?.breadcrumbs ?? []),
      {
        category_uid: category?.uid ?? '',
        category_name: category?.name,
        category_url_path: category?.url_path,
        category_level: category?.level,
      },
      {
        category_uid: uid ?? '',
        category_name: name,
        category_url_path: `p/${url_key}`,
        category_level: Number(category?.level) + 1,
      },
    ],
    [category, uid, name, url_key],
  )

  if (!category?.breadcrumbs) return null

  return <PopperBreadcrumb breadcrumbs={composedBreadcrumbs} uid={uid} {...breadcrumbProps} />
}
