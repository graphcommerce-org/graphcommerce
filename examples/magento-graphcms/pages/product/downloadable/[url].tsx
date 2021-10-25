import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  getProductStaticPaths,
  ProductPageMeta,
  ProductPageGallery,
  productPageCategory,
  jsonLdProduct,
  jsonLdProductOffer,
  ProductAddToCart,
  ProductSidebarDelivery,
  ProductShortDescription,
} from '@graphcommerce/magento-product'
import {
  DownloadableProductPageDocument,
  DownloadableProductPageQuery,
} from '@graphcommerce/magento-product-downloadable'
import { ProductReviewChip, jsonLdProductReview } from '@graphcommerce/magento-review'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { JsonLd, GetStaticProps, Title } from '@graphcommerce/next-ui'
import { Typography } from '@material-ui/core'
import { GetStaticPaths } from 'next'
import React from 'react'
import { Product } from 'schema-dts'
import FullPageShell, { FullPageShellProps } from '../../../components/AppShell/FullPageShell'
import FullPageShellHeader from '../../../components/AppShell/FullPageShellHeader'
import { ProductPageDocument, ProductPageQuery } from '../../../components/GraphQL/ProductPage.gql'
import PageContent from '../../../components/PageContent'
import RowProductDescription from '../../../components/ProductDescription'
import ProductUsps from '../../../components/ProductUsps'
import {
  RowProduct,
  Backstory,
  Feature,
  FeatureBoxed,
  Grid,
  Related,
  Reviews,
  Specs,
  Swipeable,
  Upsells,
} from '../../../components/Row'
import apolloClient from '../../../lib/apolloClient'

export const config = { unstable_JsPreload: false }

type Props = ProductPageQuery & DownloadableProductPageQuery & Pick<FullPageShellProps>

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

function ProductDownloadable(props: Props) {
  const { products, usps, typeProducts, sidebarUsps, pages } = props

  const product = products?.items?.[0]
  const typeProduct = typeProducts?.items?.[0]
  const aggregations = typeProducts?.aggregations

  if (
    product?.__typename !== 'DownloadableProduct' ||
    typeProduct?.__typename !== 'DownloadableProduct'
  )
    return <div />

  return (
    <>
      <FullPageShellHeader>
        <Title size='small' component='span'>
          {product.name}
        </Title>
      </FullPageShellHeader>
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

        <ProductShortDescription short_description={product?.short_description} />

        <ProductReviewChip rating={product.rating_summary} reviewSectionId='reviews' size='small' />
        <ProductAddToCart
          variables={{ sku: product.sku ?? '', quantity: 1 }}
          name={product.name ?? ''}
          price={product.price_range.minimum_price.regular_price}
        >
          <ProductSidebarDelivery />
        </ProductAddToCart>
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
        <ProductUsps usps={sidebarUsps} size='small' />
      </ProductPageGallery>
      <RowProductDescription {...product} right={<ProductUsps usps={usps} />} />

      {pages?.[0] && (
        <PageContent
          renderer={{
            RowProduct: (rowProps) => (
              <RowProduct
                {...rowProps}
                renderer={{
                  Specs: (rowProductProps) => (
                    <Specs {...rowProductProps} {...product} aggregations={aggregations} />
                  ),
                  Backstory: (rowProductProps) => <Backstory {...rowProductProps} />,
                  Feature: (rowProductProps) => <Feature {...rowProductProps} {...product} />,
                  FeatureBoxed: (rowProductProps) => (
                    <FeatureBoxed {...rowProductProps} {...product} />
                  ),
                  Grid: (rowProductProps) => <Grid {...rowProductProps} {...product} />,
                  Related: (rowProductProps) => <Related {...rowProductProps} {...product} />,
                  Reviews: (rowProductProps) => <Reviews {...rowProductProps} {...product} />,
                  Upsells: (rowProductProps) => <Upsells {...rowProductProps} {...product} />,
                  Swipeable: (rowProductProps) => <Swipeable {...rowProductProps} {...product} />,
                }}
              />
            ),
          }}
          content={pages?.[0].content}
        />
      )}
    </>
  )
}

ProductDownloadable.pageOptions = {
  SharedComponent: FullPageShell,
} as PageOptions

export default ProductDownloadable

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (locale: string) =>
    getProductStaticPaths(apolloClient(locale), locale, 'DownloadableProduct')
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
    query: DownloadableProductPageDocument,
    variables: { urlKey },
  })

  if (
    (await productPage).data.products?.items?.[0]?.__typename !== 'DownloadableProduct' ||
    (await typeProductPage).data.typeProducts?.items?.[0]?.__typename !== 'DownloadableProduct'
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
