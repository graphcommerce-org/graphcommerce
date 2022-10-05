import { usePrevPageRouter } from '@graphcommerce/framer-next-pages'
import { Trans } from '@lingui/react'
import { Breadcrumbs, BreadcrumbsProps, Container, Link, Typography } from '@mui/material'
import PageLink from 'next/link'
import { productPageCategory } from '../ProductPageCategory/productPageCategory'
import { ProductPageBreadcrumbFragment } from './ProductPageBreadcrumb.gql'

type ProductPageBreadcrumbsProps = ProductPageBreadcrumbFragment & BreadcrumbsProps

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
      {category?.breadcrumbs?.map((mapped_category, i) => (
        <Link
          underline='hover'
          key={mapped_category?.category_uid}
          color='inherit'
          href={`/${mapped_category?.category_url_path}`}
        >
          {mapped_category?.category_name}
        </Link>
      ))}
      <Link underline='hover' color='inherit' href={`/${category?.url_path}`}>
        {category?.name}
      </Link>
      <Typography color='text.primary'>{name}</Typography>
    </Breadcrumbs>
  )
}
