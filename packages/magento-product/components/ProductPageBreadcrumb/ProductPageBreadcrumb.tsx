import { usePrevPageRouter } from '@graphcommerce/framer-next-pages'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Breadcrumbs, BreadcrumbsProps, Container, Link, Typography } from '@mui/material'
import PageLink from 'next/link'
import { productPageCategory } from '../ProductPageCategory/productPageCategory'
import { ProductPageBreadcrumbFragment } from './ProductPageBreadcrumb.gql'

type ProductPageBreadcrumbsProps = ProductPageBreadcrumbFragment & Omit<BreadcrumbsProps, 'children'>

export function ProductPageBreadcrumb(props: ProductPageBreadcrumbsProps) {
  const { categories, name, ...breadcrumbProps } = props
  const prev = usePrevPageRouter()

  const category =
    categories?.find((c) => `/${c?.url_path}` === prev?.asPath) ?? productPageCategory(props)

  return (
    <Breadcrumbs {...breadcrumbProps}>
      <PageLink href='/' passHref>
        <Link underline='hover' color='inherit'>
          <Trans id='Home' />
        </Link>
      </PageLink>
      {filterNonNullableKeys(category?.breadcrumbs, ['category_level'])
        .sort((a, b) => a.category_level - b.category_level).map((breadcrumb, i) => (
        <Link
          underline='hover'
          key={breadcrumb.category_uid}
          color='inherit'
          href={`/${breadcrumb.category_url_path}`}
        >
          {breadcrumb.category_name}
        </Link>
      ))}
      <Link underline='hover' color='inherit' href={`/${category?.url_path}`}>
        {category?.name}
      </Link>
      <Typography color='text.primary'>{name}</Typography>
    </Breadcrumbs>
  )
}
