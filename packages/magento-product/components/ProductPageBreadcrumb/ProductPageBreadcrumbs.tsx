import { usePrevPageRouter } from '@graphcommerce/framer-next-pages'
import { categoryToBreadcrumbs } from '@graphcommerce/magento-category'
import { Breadcrumbs } from '@graphcommerce/next-ui'
import { BreadcrumbsJsonLd } from '@graphcommerce/next-ui/Breadcrumbs/BreadcrumbsJsonLd'
import { jsonLdBreadcrumb } from '@graphcommerce/next-ui/Breadcrumbs/jsonLdBreadcrumb'
import type { BreadcrumbsProps } from '@mui/material'
import { useRouter } from 'next/router'
import type { BreadcrumbList } from 'schema-dts'
import { productLink } from '../../hooks/useProductLink'
import { productPageCategory } from '../ProductPageCategory/productPageCategory'
import type { ProductPageBreadcrumbFragment } from './ProductPageBreadcrumb.gql'

export type ProductPageBreadcrumbsProps = Omit<BreadcrumbsProps, 'children'> & {
  breadcrumbsAmount?: number
  product: ProductPageBreadcrumbFragment
}

export function ProductPageBreadcrumbs(props: ProductPageBreadcrumbsProps) {
  const { product, ...breadcrumbsProps } = props
  const { categories } = product
  const prev = usePrevPageRouter()
  const router = useRouter()

  const category =
    categories?.find((c) => `/${c?.url_path}` === prev?.asPath) ?? productPageCategory(product)

  if (!category || !product.name || !product.url_key) return null

  const breadcrumbs = categoryToBreadcrumbs(category)

  return (
    <>
      <BreadcrumbsJsonLd<BreadcrumbList>
        breadcrumbs={[...breadcrumbs, { name: product.name, href: productLink(product) }]}
        render={(bc) => ({ '@context': 'https://schema.org', ...jsonLdBreadcrumb(bc, router) })}
      />
      <Breadcrumbs breadcrumbs={breadcrumbs} lastIsLink {...breadcrumbsProps} />
    </>
  )
}
