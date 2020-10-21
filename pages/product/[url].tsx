import { Container } from '@material-ui/core'
import clsx from 'clsx'
import BottomDrawerUi from 'components/AppShell/BottomDrawerUi'
import PageLayout, { PageLayoutProps } from 'components/AppShell/PageLayout'
import getLayoutHeaderProps from 'components/AppShell/getLayoutHeaderProps'
import useCategoryPageStyles from 'components/Category/useCategoryPageStyles'
import getUrlResolveProps from 'components/Page/getUrlResolveProps'
import { PageFC, PageStaticPathsFn, PageStaticPropsFn } from 'components/Page/types'
import { registerRoute } from 'components/PageTransition/historyHelpers'
import ProductPageDescription from 'components/Product/ProductPageDescription'
import ProductPageGallery from 'components/Product/ProductPageGallery'
import ProductPageMeta from 'components/Product/ProductPageMeta'
import ProductPageRelated from 'components/Product/ProductPageRelated'
import ProductPageUpsell from 'components/Product/ProductPageUpsell'
import getProductPageProps from 'components/Product/getProductProps'
import getProductStaticPaths from 'components/Product/getProductStaticPaths'
import productPageCategory from 'components/Product/productPageCategory'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import NextError from 'next/error'
import React from 'react'

type PageComponent = PageFC<GQLProductPageQuery, PageLayoutProps>
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

registerRoute('/product/[url]', BottomDrawerUi)

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
