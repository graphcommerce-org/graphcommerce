import { Container } from '@material-ui/core'
import clsx from 'clsx'
import useCategoryPageStyles from 'components/Category/useCategoryPageStyles'
import getHeaderProps from 'components/Header/getHeaderProps'
import useHeaderSpacing from 'components/Header/useHeaderSpacing'
import overlay from 'components/PageTransition/overlay'
import ProductPageBreadcrumb from 'components/Product/ProductPageBreadcrumb'
import ProductPageDescription from 'components/Product/ProductPageDescription'
import ProductPageGallery from 'components/Product/ProductPageGallery'
import ProductPageMeta from 'components/Product/ProductPageMeta'
import ProductPageRelated from 'components/Product/ProductPageRelated'
import ProductPageUpsell from 'components/Product/ProductPageUpsell'
import getProductPageProps, { GetProductPageProps } from 'components/Product/getProductProps'
import getProductStaticPaths from 'components/Product/getProductStaticPaths'
import ShopLayout, { ShopLayoutProps, PageWithShopLayout } from 'components/ShopLayout'
import getUrlResolveProps from 'components/ShopLayout/getUrlResolveProps'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import { GetStaticPaths, GetStaticProps } from 'next'
import NextError from 'next/error'
import React from 'react'

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
      <ProductPageGallery media_gallery={product.media_gallery} sku={product.sku} />
      <ProductPageUpsell upsell_products={product.upsell_products} />
      <ProductPageRelated related_products={product.related_products} />
    </Container>
  )
}

ProductPage.Layout = ShopLayout
ProductPage.pageTransition = overlay

export default ProductPage

export const getStaticPaths: GetStaticPaths<{ url: string }> = () => {
  const client = apolloClient()
  return getProductStaticPaths(client)
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
    { urlKey: `${ctx.params.url}${(await config)?.storeConfig?.product_url_suffix}` },
    staticClient,
  )
  const productPage = getProductPageProps({ urlKey: ctx.params.url }, staticClient)
  const navigation = getHeaderProps(staticClient, {
    rootCategory: String((await config).storeConfig?.root_category_id),
  })

  return {
    props: {
      ...(await urlResolve),
      ...(await navigation),
      ...(await productPage),
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}
