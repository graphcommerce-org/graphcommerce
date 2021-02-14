import { Container, Theme, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import MenuTabs from '@reachdigital/magento-app-shell/MenuTabs'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument, PageLayoutQuery } from '@reachdigital/magento-app-shell/PageLayout.gql'
import ConfigurableContextProvider from '@reachdigital/magento-product-configurable/ConfigurableContext'
import ConfigurableProductAddToCart from '@reachdigital/magento-product-configurable/ConfigurableProductAddToCart/ConfigurableProductAddToCart'
import {
  ProductConfigurableDocument,
  ProductConfigurableQuery,
} from '@reachdigital/magento-product-configurable/ProductConfigurable.gql'
import {
  ProductPageDocument,
  ProductPageQuery,
} from '@reachdigital/magento-product-types/ProductPage.gql'
import {
  ProductPageAdditionalDocument,
  ProductPageAdditionalQuery,
} from '@reachdigital/magento-product-types/ProductPageAdditional.gql'
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
import FabMenu from '../../../components/FabMenu'
import Footer from '../../../components/Footer'
import { FooterDocument, FooterQuery } from '../../../components/Footer/Footer.gql'
import HeaderActions from '../../../components/HeaderActions/HeaderActions'
import Logo from '../../../components/Logo/Logo'
import Page from '../../../components/Page'
import { PageByUrlDocument, PageByUrlQuery } from '../../../components/Page/PageByUrl.gql'
import ProductPageGallery from '../../../components/ProductPageGallery'
import RelatedProducts from '../../../components/RelatedProducts'
import apolloClient from '../../../lib/apolloClient'

const useStyles = makeStyles((theme: Theme) => ({
  hero: {
    marginBottom: theme.spacings.lg,
    display: 'grid',
    paddingLeft: 0,
    background: 'rgba(0,0,0,0.03)',
    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '2fr 1.5fr',
    },
  },
  form: {
    padding: theme.spacings.lg,
    display: 'grid',
    alignContent: 'center',
    gap: theme.spacings.sm,
  },
  title: {
    ...theme.typography.h2,
  },
}))

type Props = ProductPageQuery &
  ProductPageAdditionalQuery &
  PageByUrlQuery &
  ResolveUrlQuery &
  ProductConfigurableQuery &
  PageLayoutQuery &
  FooterQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

function ProductPage({
  products,
  productAdditionals,
  configurableProducts,
  pages,
  menu,
  urlResolver,
  footer,
}: Props) {
  const classes = useStyles()
  if (!products) return <NextError statusCode={503} title='Loading skeleton' />

  const product = products?.items?.[0]
  const configurableProduct = configurableProducts?.items?.[0]
  const upsells = productAdditionals?.items?.[0]?.upsell_products
  const related = productAdditionals?.items?.[0]?.related_products

  if (!product || !configurableProduct?.sku)
    return <NextError statusCode={404} title='Product not found' />

  const category = productPageCategory(product)
  return (
    <>
      <ConfigurableContextProvider {...configurableProduct} sku={configurableProduct.sku}>
        <ProductPageMeta {...product} />
        <FullPageUi
          title={product.name ?? ''}
          menu={<MenuTabs menu={menu} urlResolver={urlResolver} />}
          logo={<Logo />}
          actions={<HeaderActions />}
        >
          <FabMenu menu={menu} urlResolver={urlResolver} />
          <Container maxWidth={false}>
            <div className={classes.hero}>
              <ProductPageGallery {...product} />
              <div className={classes.form}>
                <Typography variant='h1' className={classes.title}>
                  {product.name ?? ''}
                </Typography>
                <ConfigurableProductAddToCart variables={{ sku: product.sku ?? '', quantity: 1 }} />
                <ProductPageDescription {...product} />
              </div>
            </div>

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
      </ConfigurableContextProvider>
    </>
  )
}

ProductPage.Layout = PageLayout

registerRouteUi('/product/configurable/[url]', FullPageUi)

export default ProductPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales }) => {
  const localePaths =
    locales?.map((locale) => {
      const client = apolloClient(localeToStore(locale))
      return getProductStaticPaths(client, locale, 'ConfigurableProduct')
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
  const configurableProduct = staticClient.query({
    query: ProductConfigurableDocument,
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
      ...(await configurableProduct).data,
      ...(await productAdditionals).data,
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}
