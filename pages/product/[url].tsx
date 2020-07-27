import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import ShopLayout, { ShopLayoutProps, PageWithShopLayout } from 'components/ShopLayout'
import getUrlResolveProps from 'components/ShopLayout/getUrlResolveProps'
import getHeaderProps from 'components/Header/getHeaderProps'
import getProductPageProps, { GetProductPageProps } from 'components/ProductPage/getProductProps'
import useCategoryPageStyles from 'components/CategoryPage/useCategoryPageStyles'
import { Container } from '@material-ui/core'
import clsx from 'clsx'
import overlay from 'components/PageTransition/overlay'
import { useHeaderSpacing } from 'components/Header/useHeaderSpacing'
import NextError from 'next/error'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import { ProductPageBreadcrumb } from 'components/ProductPageBreadcrumb'
import { ProductPageDescription } from 'components/ProductPageDescription'
import { ProductPageMeta } from 'components/ProductPageMeta'
import ProductPageUpsell from 'components/ProductPageUpsell'
import ProductPageRelated from 'components/ProductPageRelated'
import ProductPageGallery from 'components/ProductPageGallery'

const ProductPage: PageWithShopLayout<GetProductPageProps> = (props) => {
  const { products } = props
  const classes = useCategoryPageStyles(props)
  const { marginTop } = useHeaderSpacing()

  if (!products) return <NextError statusCode={503} title='Loading skeleton' />

  const product = products?.items?.[0]

  if (!product) return <NextError statusCode={404} title='Product not found' />

  return (
    <Container className={clsx(classes.container, marginTop)}>
      <ProductPageMeta
        canonical_url={product.canonical_url}
        meta_description={product.meta_description}
        meta_title={product.meta_title}
        name={product.name}
        url_key={product.url_key}
      />
      <ProductPageBreadcrumb categories={product.categories} name={product.name} />
      <ProductPageDescription
        name={product.name}
        description={product.description}
        short_description={product.short_description}
      />
      <ProductPageGallery media_gallery={product.media_gallery} />
      <ProductPageUpsell upsell_products={product.upsell_products} />
      <ProductPageRelated related_products={product.related_products} />
    </Container>
  )
}

ProductPage.Layout = ShopLayout
ProductPage.pageTransition = overlay

export default ProductPage

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { url: 'ninebot-by-segway-kickscooter-es1' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<
  ShopLayoutProps & GetProductPageProps,
  { url: string }
> = async (ctx) => {
  if (!ctx.params?.url) throw Error('No params')

  const client = apolloClient()
  const staticClient = apolloClient()
  const config = getStoreConfig(client)
  const urlResolve = getUrlResolveProps(
    { urlKey: ctx.params.url + ((await config)?.storeConfig?.product_url_suffix ?? '') },
    staticClient,
  )
  const navigation = getHeaderProps(staticClient)
  const productPage = getProductPageProps({ urlKey: ctx.params.url }, staticClient)

  return {
    props: {
      ...(await urlResolve),
      ...(await navigation),
      ...(await productPage),
      apolloState: client.cache.extract(),
    },
  }
}
