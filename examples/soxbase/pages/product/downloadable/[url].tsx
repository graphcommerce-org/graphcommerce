import { Typography } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import AddToCartButton from '@reachdigital/magento-cart/AddToCartButton'
import {
  DownloadableProductPageDocument,
  DownloadableProductPageQuery,
} from '@reachdigital/magento-product-downloadable/DownloadableProductPage.gql'
import { ProductAddToCartDocument } from '@reachdigital/magento-product/ProductAddToCart/ProductAddToCart.gql'
import productPageCategory from '@reachdigital/magento-product/ProductPageCategory'
import ProductPageGallery from '@reachdigital/magento-product/ProductPageGallery'
import ProductPageMeta from '@reachdigital/magento-product/ProductPageMeta'
import getProductStaticPaths from '@reachdigital/magento-product/ProductStaticPaths/getProductStaticPaths'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import { GetStaticPaths } from 'next'
import React from 'react'
import FullPageUi from '../../../components/AppShell/FullPageUi'
import { ProductPageDocument, ProductPageQuery } from '../../../components/GraphQL/ProductPage.gql'
import ProductpagesContent from '../../../components/ProductpagesContent'
import RowProductDescription from '../../../components/RowProductDescription'
import RowProductFeature from '../../../components/RowProductFeature'
import RowProductFeatureBoxed from '../../../components/RowProductFeatureBoxed'
import RowProductRelated from '../../../components/RowProductRelated'
import RowProductReviews from '../../../components/RowProductReviews'
import RowProductSpecs from '../../../components/RowProductSpecs'
import RowProductUpsells from '../../../components/RowProductUpsells'
import ProductUsps from '../../../components/Usps'
import apolloClient from '../../../lib/apolloClient'

export const config = { unstable_JsPreload: false }

type Props = ProductPageQuery & DownloadableProductPageQuery

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

function ProductDownloadable(props: Props) {
  const { products, usps, typeProducts, productpages } = props
  const classes = useStyles()

  const product = products?.items?.[0]
  const typeProduct = typeProducts?.items?.[0]

  if (
    product?.__typename !== 'DownloadableProduct' ||
    typeProduct?.__typename !== 'DownloadableProduct'
  )
    return <></>

  const category = productPageCategory(product)
  return (
    <FullPageUi
      title={product.name ?? ''}
      backFallbackTitle={category?.name ?? ''}
      backFallbackHref={`/${category?.url_path}`}
      {...props}
    >
      <ProductPageMeta {...product} />
      <ProductPageGallery {...product}>
        <Typography variant='h1'>{product.name ?? ''}</Typography>
        <AddToCartButton
          mutation={ProductAddToCartDocument}
          variables={{ sku: product.sku ?? '', quantity: 1 }}
        />
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
      </ProductPageGallery>

      <RowProductDescription {...product}>
        <ProductUsps usps={usps} />
      </RowProductDescription>
      <ProductpagesContent
        renderer={{
          RowProductFeature: (rowProps) => <RowProductFeature {...rowProps} {...product} />,
          RowProductFeatureBoxed: (rowProps) => (
            <RowProductFeatureBoxed {...rowProps} {...product} />
          ),
          RowProductSpecs: (rowProps) => <RowProductSpecs {...rowProps} {...product} />,
          RowProductReviews: (rowProps) => <RowProductReviews {...rowProps} {...product} />,
          RowProductRelated: (rowProps) => <RowProductRelated {...rowProps} {...product} />,
          RowProductUpsells: (rowProps) => <RowProductUpsells {...rowProps} {...product} />,
        }}
        content={productpages?.[0].content}
      />
    </FullPageUi>
  )
}

ProductDownloadable.Layout = PageLayout

registerRouteUi('/product/[url]', FullPageUi)

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

  return {
    props: {
      ...(await productPage).data,
      ...(await typeProductPage).data,
      apolloState: await conf.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
