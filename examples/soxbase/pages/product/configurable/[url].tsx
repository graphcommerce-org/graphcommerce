import { Container, Typography } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import ConfigurableContextProvider from '@reachdigital/magento-product-configurable/ConfigurableContext'
import ConfigurableProductAddToCart from '@reachdigital/magento-product-configurable/ConfigurableProductAddToCart/ConfigurableProductAddToCart'
import {
  ConfigurableProductPageDocument,
  ConfigurableProductPageQuery,
} from '@reachdigital/magento-product-configurable/ConfigurableProductPage.gql'
import productPageCategory from '@reachdigital/magento-product/ProductPageCategory'
import ProductPageGallery from '@reachdigital/magento-product/ProductPageGallery'
import ProductPageMeta from '@reachdigital/magento-product/ProductPageMeta'
import getProductStaticPaths from '@reachdigital/magento-product/ProductStaticPaths/getProductStaticPaths'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { GetStaticPaths } from 'next'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
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

type Props = ProductPageQuery & ConfigurableProductPageQuery

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

function ProductConfigurable(props: Props) {
  const { products, usps, typeProducts, productpages } = props

  const product = products?.items?.[0]
  const typeProduct = typeProducts?.items?.[0]

  if (
    product?.__typename !== 'ConfigurableProduct' ||
    typeProduct?.__typename !== 'ConfigurableProduct' ||
    !product.sku
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
      <ConfigurableContextProvider {...typeProduct} sku={product.sku}>
        <ProductPageMeta {...product} />
        <Container maxWidth={false}>
          <ProductPageGallery {...product}>
            <Typography variant='h1'>{product.name ?? ''}</Typography>
            <ConfigurableProductAddToCart variables={{ sku: product.sku ?? '', quantity: 1 }} />
          </ProductPageGallery>
        </Container>
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
      </ConfigurableContextProvider>
    </FullPageUi>
  )
}

ProductConfigurable.Layout = PageLayout

registerRouteUi('/product/[url]', FullPageUi)

export default ProductConfigurable

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (locale: string) =>
    getProductStaticPaths(apolloClient(locale), locale, 'ConfigurableProduct')
  const paths = (await Promise.all(locales.map(path))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const urlKey = params?.url ?? '??'
  const productUrls = [`product/${urlKey}`, 'product/global']

  const config = client.query({ query: StoreConfigDocument })
  const productPage = staticClient.query({
    query: ProductPageDocument,
    variables: { urlKey, productUrls },
  })
  const typeProductPage = staticClient.query({
    query: ConfigurableProductPageDocument,
    variables: { urlKey },
  })

  if (
    (await productPage).data.products?.items?.[0]?.__typename !== 'ConfigurableProduct' ||
    (await typeProductPage).data.typeProducts?.items?.[0]?.__typename !== 'ConfigurableProduct'
  ) {
    return { notFound: true }
  }

  return {
    props: {
      ...(await productPage).data,
      ...(await typeProductPage).data,
      apolloState: await config.then(() => client.cache.extract()),
    },
    revalidate: 60 * 20,
  }
}
