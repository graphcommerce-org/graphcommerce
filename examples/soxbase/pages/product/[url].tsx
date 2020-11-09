import { Container } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import useCategoryPageStyles from '@reachdigital/magento-category/useCategoryPageStyles'
import {
  ProductPageDocument,
  ProductPageQuery,
} from '@reachdigital/magento-product/ProductPage.gql'
import ProductPageDescription from '@reachdigital/magento-product/ProductPageDescription'
import ProductPageGallery from '@reachdigital/magento-product/ProductPageGallery'
import ProductPageMeta from '@reachdigital/magento-product/ProductPageMeta'
import ProductPageRelated from '@reachdigital/magento-product/ProductPageRelated'
import ProductPageUpsell from '@reachdigital/magento-product/ProductPageUpsell'
import getProductStaticPaths from '@reachdigital/magento-product/getProductStaticPaths'
import productPageCategory from '@reachdigital/magento-product/productPageCategory'
import { ResolveUrlDocument } from '@reachdigital/magento-store/ResolveUrl.gql'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import BottomDrawerUi from '@reachdigital/next-ui/AppShell/BottomDrawerUi'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import clsx from 'clsx'
import NextError from 'next/error'
import React from 'react'
import apolloClient from '../../lib/apolloClient'

type Props = ProductPageQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

function ProductPage({ products }: Props) {
  const classes = useCategoryPageStyles()

  if (!products) return <NextError statusCode={503} title='Loading skeleton' />

  const product = products?.items?.[0]

  if (!product) return <NextError statusCode={404} title='Product not found' />

  const category = productPageCategory(product)
  return (
    <BottomDrawerUi
      title={product.name ?? ''}
      backFallbackHref={`/${category?.url_path}`}
      backFallbackTitle={category?.name}
    >
      <Container className={clsx(classes.container)}>
        <ProductPageMeta
          canonical_url={product.canonical_url}
          meta_description={product.meta_description}
          meta_title={product.meta_title}
          name={product.name}
          url_key={product.url_key}
        />
        <ProductPageDescription
          name={product.name}
          description={product.description}
          short_description={product.short_description}
        />
        <ProductPageGallery media_gallery={product.media_gallery} sku={product.sku} />
        <ProductPageUpsell upsell_products={product.upsell_products} />
        <ProductPageRelated related_products={product.related_products} />
      </Container>
    </BottomDrawerUi>
  )
}

ProductPage.Layout = PageLayout

registerRouteUi('/product/[url]', BottomDrawerUi)

export default ProductPage

export const getStaticPaths: GetPageStaticPaths = () => {
  const client = apolloClient()
  return getProductStaticPaths(client)
}

export const getStaticProps: GetPageStaticProps = async (ctx) => {
  let urlKey = ctx.params?.url ?? '??'

  const client = apolloClient()
  const staticClient = apolloClient()
  const config = client.query({ query: StoreConfigDocument })

  const productPage = staticClient.query({ query: ProductPageDocument, variables: { urlKey } })
  const pageLayout = staticClient.query({ query: PageLayoutDocument })

  urlKey = `${urlKey}${(await config)?.data.storeConfig?.product_url_suffix}`
  const resolveUrl = staticClient.query({ query: ResolveUrlDocument, variables: { urlKey } })

  return {
    props: {
      ...(await resolveUrl).data,
      ...(await pageLayout).data,
      ...(await productPage).data,
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}
