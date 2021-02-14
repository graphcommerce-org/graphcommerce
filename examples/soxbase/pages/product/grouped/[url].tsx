import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import MenuTabs from '@reachdigital/magento-app-shell/MenuTabs'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument, PageLayoutQuery } from '@reachdigital/magento-app-shell/PageLayout.gql'
import {
  ProductGroupedDocument,
  ProductGroupedQuery,
} from '@reachdigital/magento-product-grouped/ProductGrouped.gql'
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
import ProductWeight from '@reachdigital/magento-product/ProductWeight'
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
import ProductListItems from '../../../components/ProductListItems/ProductListItems'
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
  ProductGroupedQuery &
  PageLayoutQuery &
  FooterQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

function ProductGrouped({
  products,
  productAdditionals,
  groupedProducts,
  pages,
  menu,
  urlResolver,
  footer,
}: Props) {
  const classes = useStyles()
  if (!products) return <NextError statusCode={503} title='Loading skeleton' />

  const product = products?.items?.[0]
  const groupedProduct = groupedProducts?.items?.[0]
  const upsells = productAdditionals?.items?.[0]?.upsell_products
  const related = productAdditionals?.items?.[0]?.related_products

  if (!product || !groupedProduct) return <NextError statusCode={404} title='Product not found' />

  const { items, weight } = groupedProduct

  const groupItems =
    items?.map((item) => {
      if (!item?.product) return null
      return { ...item?.product }
    }) ?? []

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
        <FabMenu menu={menu} urlResolver={urlResolver} />
        <Container maxWidth={false}>
          <div className={classes.hero}>
            <ProductPageGallery {...product} />
            <div className={classes.form}>
              <Typography variant='h1' className={classes.title}>
                {product.name ?? ''}
              </Typography>
              <ProductWeight weight={weight} />
              <ProductPageDescription {...product} />

              {pages?.[0] && <Page {...pages?.[0]} />}

              <Typography variant='h3'>Items in this grouped product</Typography>

              <ul>
                {groupItems.map((item) => (
                  <li key={item?.name}>
                    <div>{item?.name}</div>
                    <div />
                  </li>
                ))}
              </ul>
            </div>
          </div>
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

ProductGrouped.Layout = PageLayout

registerRouteUi('/product/Grouped/[url]', FullPageUi)

export default ProductGrouped

export const getStaticPaths: GetPageStaticPaths = async ({ locales }) => {
  const localePaths =
    locales?.map((locale) => {
      const client = apolloClient(localeToStore(locale))
      return getProductStaticPaths(client, locale, 'GroupedProduct')
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
  const groupedProduct = staticClient.query({
    query: ProductGroupedDocument,
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
      ...(await groupedProduct).data,
      ...(await productAdditionals).data,
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}
