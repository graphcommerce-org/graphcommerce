import { Container } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import getLayoutHeaderProps from '@reachdigital/magento-app-shell/getLayoutHeaderProps'
import useCategoryPageStyles from '@reachdigital/magento-category/useCategoryPageStyles'
import { ProductPageQuery } from '@reachdigital/magento-product/ProductPage.graphql'
import ProductPageDescription from '@reachdigital/magento-product/ProductPageDescription'
import ProductPageGallery from '@reachdigital/magento-product/ProductPageGallery'
import ProductPageMeta from '@reachdigital/magento-product/ProductPageMeta'
import ProductPageRelated from '@reachdigital/magento-product/ProductPageRelated'
import ProductPageUpsell from '@reachdigital/magento-product/ProductPageUpsell'
import getProductPageProps from '@reachdigital/magento-product/getProductProps'
import getProductStaticPaths from '@reachdigital/magento-product/getProductStaticPaths'
import productPageCategory from '@reachdigital/magento-product/productPageCategory'
import getStoreConfig from '@reachdigital/magento-store/getStoreConfig'
import getUrlResolveProps from '@reachdigital/magento-store/getUrlResolveProps'
import BottomDrawerUi from '@reachdigital/next-ui/AppShell/BottomDrawerUi'
import { PageFC, PageStaticPathsFn, PageStaticPropsFn } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import clsx from 'clsx'
import NextError from 'next/error'
import React from 'react'
import apolloClient from '../../lib/apolloClient'

type PageComponent = PageFC<ProductPageQuery, PageLayoutProps>
type GetPageStaticPaths = PageStaticPathsFn<{ url: string }>
type GetPageStaticProps = PageStaticPropsFn<PageComponent, { url: string }>

const ProductPage: PageComponent = (props) => {
  const { products } = props
  const classes = useCategoryPageStyles(props)

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
  if (!ctx.params?.url) throw Error('No params')

  const client = apolloClient()
  const staticClient = apolloClient()
  const config = getStoreConfig(client)

  const urlResolve = getUrlResolveProps(
    { urlKey: `${ctx.params.url}${(await config)?.storeConfig?.product_url_suffix}` },
    staticClient,
  )
  const productPage = getProductPageProps({ urlKey: ctx.params.url }, staticClient)
  const layoutHeader = getLayoutHeaderProps(staticClient)

  return {
    props: {
      title: (await productPage).products?.items?.[0]?.name || '',
      ...(await urlResolve),
      ...(await layoutHeader),
      ...(await productPage),
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}
