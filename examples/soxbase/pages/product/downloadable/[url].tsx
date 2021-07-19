import { Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { AddToCartButton } from '@reachdigital/magento-cart'
import {
  getProductStaticPaths,
  ProductPageMeta,
  ProductPageGallery,
  productPageCategory,
  jsonLdProduct,
  jsonLdProductOffer,
  ProductAddToCartDocument,
  ProductSidebarDelivery,
} from '@reachdigital/magento-product'
import {
  DownloadableProductPageDocument,
  DownloadableProductPageQuery,
} from '@reachdigital/magento-product-downloadable'
import { ProductReviewSummary, jsonLdProductReview } from '@reachdigital/magento-product-review'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import { JsonLd, GetStaticProps } from '@reachdigital/next-ui'
import { GetStaticPaths } from 'next'
import React from 'react'
import { Product } from 'schema-dts'
import FullPageShell, { FullPageShellProps } from '../../../components/AppShell/FullPageShell'
import { ProductPageDocument, ProductPageQuery } from '../../../components/GraphQL/ProductPage.gql'
import ProductUsps from '../../../components/ProductUsps'
import ProductpagesContent from '../../../components/ProductpagesContent'
import RowProductDescription from '../../../components/RowProductDescription'
import RowProductFeature from '../../../components/RowProductFeature'
import RowProductFeatureBoxed from '../../../components/RowProductFeatureBoxed'
import RowProductRelated from '../../../components/RowProductRelated'
import RowProductReviews from '../../../components/RowProductReviews'
import RowProductSpecs from '../../../components/RowProductSpecs'
import RowProductUpsells from '../../../components/RowProductUpsells'
import apolloClient from '../../../lib/apolloClient'

type Props = ProductPageQuery & DownloadableProductPageQuery

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

function ProductDownloadable(props: Props) {
  const { products, usps, typeProducts, sidebarUsps, productpages } = props

  const product = products?.items?.[0]
  const typeProduct = typeProducts?.items?.[0]
  const aggregations = typeProducts?.aggregations

  if (
    product?.__typename !== 'DownloadableProduct' ||
    typeProduct?.__typename !== 'DownloadableProduct'
  )
    return <></>

  return (
    <>
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
        <Typography variant='h1'>{product.name ?? ''}</Typography>
        <ProductReviewSummary {...product} reviewSectionId='reviews' />
        <AddToCartButton
          mutation={ProductAddToCartDocument}
          variables={{ sku: product.sku ?? '', quantity: 1 }}
          name={product.name ?? ''}
          price={product.price_range.minimum_price.regular_price}
        >
          <ProductSidebarDelivery />
        </AddToCartButton>
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
      <ProductpagesContent
        renderer={{
          RowProductFeature: (rowProps) => <RowProductFeature {...rowProps} {...product} />,
          RowProductFeatureBoxed: (rowProps) => (
            <RowProductFeatureBoxed {...rowProps} {...product} />
          ),
          RowProductSpecs: (rowProps) => (
            <RowProductSpecs {...rowProps} {...product} aggregations={aggregations} />
          ),
          RowProductReviews: (rowProps) => <RowProductReviews {...rowProps} {...product} />,
          RowProductRelated: (rowProps) => <RowProductRelated {...rowProps} {...product} />,
          RowProductUpsells: (rowProps) => <RowProductUpsells {...rowProps} {...product} />,
        }}
        content={productpages?.[0].content}
      />
    </>
  )
}

ProductDownloadable.pageOptions = {
  SharedComponent: FullPageShell,
  sharedKey: () => 'page',
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
  const productUrls = [`product/${urlKey}`, 'product/global']

  const conf = client.query({ query: StoreConfigDocument })
  const productPage = staticClient.query({
    query: ProductPageDocument,
    variables: {
      urlKey,
      productUrls,
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
  return {
    props: {
      ...(await productPage).data,
      ...(await typeProductPage).data,
      apolloState: await conf.then(() => client.cache.extract()),
      backFallbackHref: category?.url_path ? `/${category?.url_path}` : null,
      backFallbackTitle: category?.name ?? null,
    },
    revalidate: 60 * 20,
  }
}
