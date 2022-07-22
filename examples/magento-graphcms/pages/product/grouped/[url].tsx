import { url } from 'inspector'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  getProductStaticPaths,
  jsonLdProduct,
  jsonLdProductOffer,
  ProductAddToCart,
  productPageCategory,
  ProductAddToCartForm,
  ProductPageDescription,
  ProductPageGallery,
  ProductPageMeta,
  ProductShortDescription,
  ProductSidebarDelivery,
  AddToCartButton,
  AddToCartQuantity,
  AddToCartSnackbar,
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
import { Box, Divider, Typography } from '@mui/material'
import { GetStaticPaths } from 'next'
import React from 'react'
import { LayoutFull, LayoutFullProps, RowProduct, RowRenderer, Usps } from '../../../components'
import { ProductPageDocument, ProductPageQuery } from '../../../graphql/ProductPage.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type Props = ProductPageQuery & GroupedProductPageQuery

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutFullProps, Props, RouteProps>

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

      <ProductAddToCartForm sku={product.sku} urlKey={product.url_key}>
        <ProductPageGallery
          {...product}
          sx={(theme) => ({
            '& .SidebarGallery-sidebar': { display: 'grid', rowGap: theme.spacings.sm },
          })}
        >
          <div>
            <Typography variant='h2' component='div'>
              {product.name}
            </Typography>

            <ProductShortDescription short_description={product?.short_description} />
            <ProductReviewChip rating={product.rating_summary} reviewSectionId='reviews' />
          </div>

          <Divider />
          <AddToCartQuantity />

          <ul>
            {typeProduct.items?.map(
              (item) =>
                item?.product?.sku && (
                  <li key={item?.product?.name}>
                    <div>{item?.product?.name}</div>
                    <div>
                      <ProductAddToCart
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

          <ProductSidebarDelivery />
          <Box
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              columnGap: theme.spacings.xs,
            })}
          >
            <AddToCartButton sx={{ width: '100%' }} />
            <ProductWishlistChipDetail {...product} />
          </Box>

          <AddToCartSnackbar name={product.name} />
          <Usps usps={sidebarUsps} size='small' />
        </ProductPageGallery>
      </ProductAddToCartForm>

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
  Layout: LayoutFull,
} as PageOptions

export default ProductGrouped

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (locale: string) =>
    getProductStaticPaths(graphqlSsrClient(locale), locale, 'GroupedProduct')
  const paths = (await Promise.all(locales.map(path))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)

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
    query: GroupedProductPageDocument,
    variables: { urlKey },
  })

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
      apolloState: await conf.then(() => client.cache.extract()),
      up,
    },
    revalidate: 60 * 20,
  }
}
