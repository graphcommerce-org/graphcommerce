import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  getProductStaticPaths,
  jsonLdProduct,
  jsonLdProductOffer,
  ProductAddToCart,
  productPageCategory,
  ProductPageDescription,
  ProductPageGallery,
  ProductPageMeta,
  ProductSidebarDelivery,
} from '@graphcommerce/magento-product'
import {
  BundleItemsForm,
  BundleProductPageDocument,
  BundleProductPageQuery,
} from '@graphcommerce/magento-product-bundle'
import { jsonLdProductReview, ProductReviewChip } from '@graphcommerce/magento-review'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, JsonLd, Title, AppBar } from '@graphcommerce/next-ui'
import { Typography } from '@material-ui/core'
import { GetStaticPaths } from 'next'
import React from 'react'
import { Product } from 'schema-dts'
import FullPageShell, { FullPageShellProps } from '../../../components/AppShell/FullPageShell'
import { ProductPageDocument, ProductPageQuery } from '../../../components/GraphQL/ProductPage.gql'
import { RowProduct } from '../../../components/Row'
import RowRenderer from '../../../components/Row/RowRenderer'
import Usps from '../../../components/Usps'
import apolloClient from '../../../lib/apolloClient'

export const config = { unstable_JsPreload: false }

type Props = ProductPageQuery & BundleProductPageQuery

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

function ProductBundle(props: Props) {
  const { products, usps, typeProducts, sidebarUsps, pages } = props

  const product = products?.items?.[0]
  const typeProduct = typeProducts?.items?.[0]
  const aggregations = typeProducts?.aggregations

  if (product?.__typename !== 'BundleProduct' || typeProduct?.__typename !== 'BundleProduct')
    return <div />

  return (
    <>
      <AppBar>
        <Title size='small' component='span'>
          {product.name}
        </Title>
      </AppBar>
      <JsonLd<Product>
        item={{
          '@context': 'https://schema.org',
          ...jsonLdProduct(product),
          ...jsonLdProductOffer(product),
          ...jsonLdProductReview(product),
        }}
      />
      <ProductPageMeta {...product} />
      <ProductPageGallery {...product}>
        <Typography variant='h3' component='div'>
          {product.name}
        </Typography>
        <ProductReviewChip rating={product.rating_summary} reviewSectionId='reviews' size='small' />
        <ProductAddToCart
          variables={{ sku: product.sku ?? '', quantity: 1 }}
          name={product.name ?? ''}
          price={product.price_range.minimum_price.regular_price}
        >
          <ProductSidebarDelivery />
        </ProductAddToCart>
        <BundleItemsForm {...typeProduct} />
        <Usps usps={sidebarUsps} size='small' />
      </ProductPageGallery>

      <ProductPageDescription {...product} right={<Usps usps={usps} />} />

      {pages?.[0] && (
        <RowRenderer
          content={pages?.[0].content}
          renderer={{
            RowProduct: (rowProps) => (
              <RowProduct {...rowProps} {...product} aggregations={aggregations} />
            ),
          }}
        />
      )}
    </>
  )
}

ProductBundle.pageOptions = {
  SharedComponent: FullPageShell,
} as PageOptions

export default ProductBundle

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (locale: string) =>
    getProductStaticPaths(apolloClient(locale), locale, 'BundleProduct')
  const paths = (await Promise.all(locales.map(path))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const urlKey = params?.url ?? '??'

  const conf = client.query({ query: StoreConfigDocument })
  const productPage = staticClient.query({
    query: ProductPageDocument,
    variables: {
      url: 'product/global',
      urlKey,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })
  const typeProductPage = staticClient.query({
    query: BundleProductPageDocument,
    variables: { urlKey },
  })

  if (
    (await productPage).data.products?.items?.[0]?.__typename !== 'BundleProduct' ||
    (await typeProductPage).data.typeProducts?.items?.[0]?.__typename !== 'BundleProduct'
  ) {
    return { notFound: true }
  }

  const category = productPageCategory((await productPage).data?.products?.items?.[0])
  const up =
    category?.url_path && category?.name
      ? { href: `/${category.url_path}`, title: category.name }
      : { href: `/`, title: 'Home' }

  return {
    props: {
      ...(await productPage).data,
      ...(await typeProductPage).data,
      apolloState: await conf.then(() => client.cache.extract()),
      up,
    },
    revalidate: 60 * 20,
  }
}
