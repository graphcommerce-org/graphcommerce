import { usePrevPageRouter } from '@graphcommerce/framer-next-pages'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import type { BreadcrumbsProps } from '@mui/material'
import { Breadcrumbs, Link, Typography } from '@mui/material'
import { productPageCategory } from '../ProductPageCategory/productPageCategory'
import type { ProductPageBreadcrumbFragment } from './ProductPageBreadcrumb.gql'

type ProductPageBreadcrumbsProps = ProductPageBreadcrumbFragment &
  Omit<BreadcrumbsProps, 'children'>

/**
 * @deprecated Please use ProductPageBreadcrumbs
 */
export function ProductPageBreadcrumb(props: ProductPageBreadcrumbsProps) {
  const { categories, name, ...breadcrumbProps } = props
  const prev = usePrevPageRouter()

  const category =
    categories?.find((c) => `/${c?.url_path}` === prev?.asPath) ?? productPageCategory(props)

  return (
    <Breadcrumbs {...breadcrumbProps}>
      <Link href='/' underline='hover' color='inherit'>
        <Trans id='Home' />
      </Link>
      {filterNonNullableKeys(category?.breadcrumbs, ['category_level'])
        .sort((a, b) => a.category_level - b.category_level)
        .map((breadcrumb) => (
          <Link
            underline='hover'
            key={breadcrumb.category_uid}
            color='inherit'
            href={`/${breadcrumb.category_url_path}`}
          >
            {breadcrumb.category_name}
          </Link>
        ))}
      {category && (
        <Link href={`/${category?.url_path}`} underline='hover' color='inherit'>
          {category?.name}
        </Link>
      )}
      <Typography color='text.primary'>{name}</Typography>
    </Breadcrumbs>
  )
}
