import { usePrevPageRouter } from '@graphcommerce/framer-next-pages'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Breadcrumbs, BreadcrumbsProps, Link, Typography } from '@mui/material'
import { productPageCategory } from '../ProductPageCategory/productPageCategory'
import { ProductPageBreadcrumbFragment } from './ProductPageBreadcrumb.gql'

type ProductPageBreadcrumbsProps = ProductPageBreadcrumbFragment &
  Omit<BreadcrumbsProps, 'children'>

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
      <Link href={`/${category?.url_path}`} underline='hover' color='inherit'>
        {category?.name}
      </Link>
      <Typography color='text.primary'>{name}</Typography>
    </Breadcrumbs>
  )
}
