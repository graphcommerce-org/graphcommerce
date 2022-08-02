import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  getProductStaticPaths,
  jsonLdProduct,
  jsonLdProductOffer,
  productPageCategory,
  ProductAddToCartForm,
  ProductPageDescription,
  ProductPageGallery,
  ProductPageMeta,
  ProductShortDescription,
  ProductSidebarDelivery,
  ProductAddToCartQuantity,
  ProductAddToCartButton,
  ProductAddToCartSnackbar,
} from '@graphcommerce/magento-product'
import {
  DownloadableProductPageDocument,
  DownloadableProductPageQuery,
} from '@graphcommerce/magento-product-downloadable'
import { jsonLdProductReview, ProductReviewChip } from '@graphcommerce/magento-review'
import { Money, StoreConfigDocument } from '@graphcommerce/magento-store'
import { ProductWishlistChipDetail } from '@graphcommerce/magento-wishlist'
import {
  GetStaticProps,
  JsonLd,
  LayoutHeader,
  LayoutTitle,
  findByTypename,
} from '@graphcommerce/next-ui'
import { Box, Divider, Typography } from '@mui/material'
import { GetStaticPaths } from 'next'
import React from 'react'
import {
  LayoutNavigation,
  LayoutNavigationProps,
  RowProduct,
  RowRenderer,
  Usps,
} from '../../../components'
import { ProductPageDocument, ProductPageQuery } from '../../../graphql/ProductPage.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../../lib/graphql/graphqlSsrClient'

type Props = ProductPageQuery & DownloadableProductPageQuery

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function ProductDownloadable(props: Props) {
  const { products, usps, typeProducts, sidebarUsps, pages } = props

  const product = findByTypename(products?.items, 'DownloadableProduct')
  const typeProduct = findByTypename(typeProducts?.items, 'DownloadableProduct')
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
          <ProductAddToCartQuantity />

          <Typography component='div' variant='h3' lineHeight='1'>
            <Money {...product.price_range.minimum_price.final_price} />
          </Typography>

          <ProductSidebarDelivery />
          <Box
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              columnGap: theme.spacings.xs,
            })}
          >
            <ProductAddToCartButton fullWidth />
            <ProductWishlistChipDetail {...product} />
          </Box>

          <ProductAddToCartSnackbar name={product.name} />
          <Usps usps={sidebarUsps} size='small' />
          {typeProduct.downloadable_product_links?.map((option) => (
            <div key={option?.title}>
              {option?.title} + {option?.price}
            </div>
          ))}
          {typeProduct.downloadable_product_samples?.map((sample) => (
            <div key={sample?.title}>
              {sample?.title} {sample?.sample_url} {sample?.sort_order}
            </div>
          ))}
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

ProductDownloadable.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default ProductDownloadable

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (locale: string) =>
    getProductStaticPaths(graphqlSsrClient(locale), locale, 'DownloadableProduct')
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
    query: DownloadableProductPageDocument,
    variables: { urlKey },
  })

  const product = findByTypename((await productPage).data.products?.items, 'DownloadableProduct')
  const typeProduct = findByTypename(
    (await typeProductPage).data.typeProducts?.items,
    'DownloadableProduct',
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
