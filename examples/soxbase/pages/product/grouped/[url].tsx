import { Container, Typography } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import AddToCartButton from '@reachdigital/magento-cart/AddToCartButton'
import {
  GroupedProductPageDocument,
  GroupedProductPageQuery,
} from '@reachdigital/magento-product-grouped/GroupedProductPage.gql'
import { ProductAddToCartDocument } from '@reachdigital/magento-product/ProductAddToCart/ProductAddToCart.gql'
import productPageCategory from '@reachdigital/magento-product/ProductPageCategory'
import ProductPageGallery from '@reachdigital/magento-product/ProductPageGallery'
import ProductPageMeta from '@reachdigital/magento-product/ProductPageMeta'
import getProductStaticPaths from '@reachdigital/magento-product/ProductStaticPaths/getProductStaticPaths'
import ProductWeight from '@reachdigital/magento-product/ProductWeight'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
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

type Props = ProductPageQuery & GroupedProductPageQuery

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

function ProductGrouped(props: Props) {
  const { products, usps, typeProducts, productpages } = props

  const product = products?.items?.[0]
  const typeProduct = typeProducts?.items?.[0]

  if (product?.__typename !== 'GroupedProduct' || typeProduct?.__typename !== 'GroupedProduct')
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
      <Container maxWidth={false}>
        <ProductPageGallery {...product}>
          <Typography variant='h1'>{product.name ?? ''}</Typography>
          <ul>
            {typeProduct.items?.map(
              (item) =>
                item?.product?.sku && (
                  <li key={item?.product?.name}>
                    <div>{item?.product?.name}</div>
                    <div>
                      <AddToCartButton
                        mutation={ProductAddToCartDocument}
                        variables={{ sku: item.product.sku ?? '', quantity: item.qty || 1 }}
                      />
                    </div>
                  </li>
                ),
            )}
          </ul>
          <ProductWeight weight={typeProduct?.weight} />
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
    </FullPageUi>
  )
}

ProductGrouped.Layout = PageLayout

registerRouteUi('/product/[url]', FullPageUi)

export default ProductGrouped

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (locale: string) =>
    getProductStaticPaths(apolloClient(locale), locale, 'GroupedProduct')
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
    query: GroupedProductPageDocument,
    variables: { urlKey },
  })

  if (
    (await productPage).data.products?.items?.[0]?.__typename !== 'GroupedProduct' ||
    (await typeProductPage).data.typeProducts?.items?.[0]?.__typename !== 'GroupedProduct'
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
