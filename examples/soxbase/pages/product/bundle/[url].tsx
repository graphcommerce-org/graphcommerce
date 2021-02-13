import { Container, Typography } from '@material-ui/core'
import MenuTabs from '@reachdigital/magento-app-shell/MenuTabs'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument, PageLayoutQuery } from '@reachdigital/magento-app-shell/PageLayout.gql'
import AddToCartButton from '@reachdigital/magento-cart/AddToCartButton'
import BundleItemsForm from '@reachdigital/magento-product-bundle/BundleItemsForm'
import {
  ProductBundleDocument,
  ProductBundleQuery,
} from '@reachdigital/magento-product-bundle/ProductBundle.gql'
import {
  ProductPageDocument,
  ProductPageQuery,
} from '@reachdigital/magento-product-types/ProductPage.gql'
import {
  ProductPageAdditionalDocument,
  ProductPageAdditionalQuery,
} from '@reachdigital/magento-product-types/ProductPageAdditional.gql'
import { ProductAddToCartDocument } from '@reachdigital/magento-product/ProductAddToCart/ProductAddToCart.gql'
import productPageCategory from '@reachdigital/magento-product/ProductPageCategory'
import ProductPageDescription from '@reachdigital/magento-product/ProductPageDescription'
import ProductPageMeta from '@reachdigital/magento-product/ProductPageMeta'
import getProductStaticPaths from '@reachdigital/magento-product/ProductStaticPaths/getProductStaticPaths'
import { ResolveUrlDocument, ResolveUrlQuery } from '@reachdigital/magento-store/ResolveUrl.gql'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import FullPageUi from '@reachdigital/next-ui/AppShell/FullPageUi'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import NextError from 'next/error'
import React from 'react'
import Footer from '../../../components/Footer'
import { FooterDocument, FooterQuery } from '../../../components/Footer/Footer.gql'
import HeaderActions from '../../../components/HeaderActions/HeaderActions'
import Logo from '../../../components/Logo/Logo'
import Page from '../../../components/Page'
import { PageByUrlDocument, PageByUrlQuery } from '../../../components/Page/PageByUrl.gql'
import ProductPageGallery from '../../../components/ProductPageGallery'
import RelatedProducts from '../../../components/RelatedProducts'
import apolloClient from '../../../lib/apolloClient'

type Props = ProductPageQuery &
  ProductPageAdditionalQuery &
  PageByUrlQuery &
  ResolveUrlQuery &
  ProductBundleQuery &
  PageLayoutQuery &
  FooterQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

function ProductPage({
  products,
  productAdditionals,
  bundleProducts,
  pages,
  menu,
  urlResolver,
  footer,
}: Props) {
  if (!products) return <NextError statusCode={503} title='Loading skeleton' />

  const product = products?.items?.[0]
  const bundleProduct = bundleProducts?.items?.[0]
  const upsells = productAdditionals?.items?.[0]?.upsell_products
  const related = productAdditionals?.items?.[0]?.related_products

  if (!product) return <NextError statusCode={404} title='Product not found' />

  const category = productPageCategory(product)
  return (
    <>
      <ProductPageMeta {...product} />
      <FullPageUi
        title={product.name ?? ''}
        menu={<MenuTabs menu={menu} urlResolver={urlResolver} />}
        logo={<Logo />}
        actions={<HeaderActions />}
      >
        <Container>
          <AddToCartButton
            mutation={ProductAddToCartDocument}
            variables={{ sku: product.sku ?? '', quantity: 1 }}
          />
          <BundleItemsForm {...bundleProduct} />
          <ProductPageDescription {...product} />
          <ProductPageGallery {...product} />
          {pages?.[0] && <Page {...pages?.[0]} />}

          {upsells && upsells.length > 0 ? (
            <RelatedProducts title='Looking for a better fit?' items={upsells} />
          ) : null}
          {related && related.length > 0 ? (
            <RelatedProducts title={`More like this: ${category?.name}`} items={related} />
          ) : null}
        </Container>

        <Footer footer={footer} />
      </FullPageUi>
    </>
  )
}

ProductPage.Layout = PageLayout

registerRouteUi('/product/bundle/[url]', FullPageUi)

export default ProductPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales }) => {
  const localePaths =
    locales?.map((locale) => {
      const client = apolloClient(localeToStore(locale))
      return getProductStaticPaths(client, locale, 'BundleProduct')
    }) ?? []
  const paths = (await Promise.all(localePaths)).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const urlKey = params?.url ?? '??'

  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))
  const config = client.query({ query: StoreConfigDocument })

  const page = staticClient.query({
    query: PageByUrlDocument,
    variables: { url: `product/${urlKey}` },
  })
  const productPage = staticClient.query({
    query: ProductPageDocument,
    variables: { urlKey },
  })
  const bundleProduct = staticClient.query({
    query: ProductBundleDocument,
    variables: { urlKey },
  })
  const productAdditionals = staticClient.query({
    query: ProductPageAdditionalDocument,
    variables: { urlKey },
  })
  const pageLayout = staticClient.query({
    query: PageLayoutDocument,
  })
  const footer = staticClient.query({ query: FooterDocument })
  const resolveUrl = staticClient.query({
    query: ResolveUrlDocument,
    variables: {
      urlKey: `${urlKey}${(await config)?.data.storeConfig?.product_url_suffix}`,
    },
  })

  return {
    props: {
      ...(await resolveUrl).data,
      ...(await pageLayout).data,
      ...(await footer).data,
      ...(await productPage).data,
      ...(await page).data,
      ...(await bundleProduct).data,
      ...(await productAdditionals).data,
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}
