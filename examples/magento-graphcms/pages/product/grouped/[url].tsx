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
  ProductShortDescription,
  ProductSidebarDelivery,
} from '@graphcommerce/magento-product'
import {
  GroupedProductPageDocument,
  GroupedProductPageQuery,
} from '@graphcommerce/magento-product-grouped'
import { jsonLdProductReview, ProductReviewChip } from '@graphcommerce/magento-review'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { ProductWishlistChipDetail } from '@graphcommerce/magento-wishlist'
import {
  GetStaticProps,
  JsonLd,
  LayoutTitle,
  LayoutHeader,
  findByTypename,
} from '@graphcommerce/next-ui'
import { Typography } from '@mui/material'
import { GetStaticPaths } from 'next'
import React from 'react'
import {
  LayoutDocument,
  LayoutNavigation,
  LayoutNavigationProps,
  RowProduct,
  RowRenderer,
  Usps,
} from '../../../components'
import { ProductPageDocument, ProductPageQuery } from '../../../graphql/ProductPage.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type Props = ProductPageQuery & GroupedProductPageQuery

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function ProductGrouped(props: Props) {
  const { products, usps, sidebarUsps, typeProducts, pages } = props

  const product = findByTypename(products?.items, 'GroupedProduct')
  const typeProduct = findByTypename(typeProducts?.items, 'GroupedProduct')
  const aggregations = products?.aggregations

  if (!product?.sku || !product.url_key || !typeProduct) return null

  return (
    <>
      <LayoutHeader floatingMd>
        <LayoutTitle size='small' component='span'>
          {product.name}
        </LayoutTitle>
      </LayoutHeader>
      <JsonLd
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

        <ProductShortDescription short_description={product?.short_description} />

        <ProductReviewChip rating={product.rating_summary} reviewSectionId='reviews' />
        <ul>
          {typeProduct.items?.map(
            (item) =>
              item?.product?.sku && (
                <li key={item?.product?.name}>
                  <div>{item?.product?.name}</div>
                  <div>
                    <ProductAddToCart
                      variables={{ sku: item.product.sku ?? '', quantity: item.qty || 1 }}
                      name={product.name ?? ''}
                      price={product.price_range.minimum_price.final_price}
                      additionalButtons={<ProductWishlistChipDetail {...product} />}
                    >
                      <ProductSidebarDelivery />
                    </ProductAddToCart>
                  </div>
                </li>
              ),
          )}
        </ul>
        <Usps usps={sidebarUsps} size='small' />
      </ProductPageGallery>

      <ProductPageDescription {...product} right={<Usps usps={usps} />} fontSize='responsive' />

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

ProductGrouped.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default ProductGrouped

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (!import.meta.graphCommerce.legacyProductRoute) return { paths: [], fallback: false }
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (locale: string) =>
    getProductStaticPaths(graphqlSsrClient(locale), locale, 'GroupedProduct')
  const paths = (await Promise.all(locales.map(path))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale, defaultLocale }) => {
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)

  const urlKey = params?.url ?? '??'

  const conf = client.query({ query: StoreConfigDocument })
  const productPage = staticClient.query({
    query: ProductPageDocument,
    variables: { url: 'product/global', urlKey },
  })
  const typeProductPage = staticClient.query({
    query: GroupedProductPageDocument,
    variables: { urlKey },
  })
  const layout = staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })

  const product = findByTypename((await productPage).data.products?.items, 'GroupedProduct')
  const typeProduct = findByTypename(
    (await typeProductPage).data.typeProducts?.items,
    'GroupedProduct',
  )
  if (!product || !typeProduct) return { notFound: true }

  const category = productPageCategory((await productPage).data?.products?.items?.[0])
  const up =
    category?.url_path && category?.name
      ? { href: `/${category.url_path}`, title: category.name }
      : { href: `/`, title: 'Home' }

  return {
    props: {
      ...(await productPage).data,
      ...(await typeProductPage).data,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
      up,
    },
    revalidate: 60 * 20,
  }
}
