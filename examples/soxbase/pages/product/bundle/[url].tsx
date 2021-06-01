import { Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { ProductImage } from '@reachdigital/graphql'
import { AddToCartButton } from '@reachdigital/magento-cart'
import BundleItemsForm from '@reachdigital/magento-product-bundle/BundleItemsForm'
import {
  BundleProductPageDocument,
  BundleProductPageQuery,
} from '@reachdigital/magento-product-bundle/BundleProductPage.gql'
import JsonLdProduct from '@reachdigital/magento-product/JsonLdProduct'
import JsonLdProductOffer from '@reachdigital/magento-product/JsonLdProductOffer'
import { ProductAddToCartDocument } from '@reachdigital/magento-product/ProductAddToCart/ProductAddToCart.gql'
import productPageCategory from '@reachdigital/magento-product/ProductPageCategory'
import ProductPageGallery from '@reachdigital/magento-product/ProductPageGallery'
import ProductPageMeta from '@reachdigital/magento-product/ProductPageMeta'
import getProductStaticPaths from '@reachdigital/magento-product/ProductStaticPaths/getProductStaticPaths'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { GetStaticPaths } from 'next'
import React from 'react'
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

export const config = { unstable_JsPreload: false }

type Props = ProductPageQuery & BundleProductPageQuery

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

function ProductBundle(props: Props) {
  const { products, usps, typeProducts, productpages } = props

  const product = products?.items?.[0]
  const typeProduct = typeProducts?.items?.[0]
  const aggregations = typeProducts?.aggregations

  if (product?.__typename !== 'BundleProduct' || typeProduct?.__typename !== 'BundleProduct')
    return <></>

  return (
    <>
      <JsonLdProduct
        name={product.name ?? ''}
        sku={product.sku ?? ''}
        description={product.description?.html}
        image={product.media_gallery?.map((img) => (img as ProductImage)?.url ?? '')}
        identifier={product?.url_key ?? ''}
        category={product?.categories?.[0]?.name ?? ''}
      />

      <JsonLdProductOffer
        priceCurrency={product?.price_range.minimum_price.final_price.currency ?? 'USD'}
        lowPrice={product?.price_range.minimum_price.final_price.value ?? 0}
        highPrice={product?.price_range?.maximum_price?.final_price.value ?? 0}
      />

      <ProductPageMeta {...product} />
      <ProductPageGallery {...product}>
        <Typography variant='h1'>{product.name ?? ''}</Typography>
        <AddToCartButton
          mutation={ProductAddToCartDocument}
          variables={{ sku: product.sku ?? '', quantity: 1 }}
          name={product.name ?? ''}
        />
        <BundleItemsForm {...typeProduct} />
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

ProductBundle.pageOptions = {
  SharedComponent: FullPageShell,
  sharedKey: () => 'page',
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
