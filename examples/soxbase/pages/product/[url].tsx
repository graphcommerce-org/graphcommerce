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
import localeToStore from '@reachdigital/magento-store/localeToStore'
import BottomDrawerUi from '@reachdigital/next-ui/AppShell/BottomDrawerUi'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import clsx from 'clsx'
import NextError from 'next/error'
import React from 'react'
import Page from '../../components/Page'
import { PageByUrlDocument, PageByUrlQuery } from '../../components/Page/PageByUrl.gql'
import apolloClient from '../../lib/apolloClient'

type Props = ProductPageQuery & PageByUrlQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

function ProductPage({ products, pages }: Props) {
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
        {pages?.[0] && <Page {...pages?.[0]} />}
        <ProductPageUpsell upsell_products={product.upsell_products} />
        <ProductPageRelated related_products={product.related_products} />
      </Container>
    </BottomDrawerUi>
  )
}

ProductPage.Layout = PageLayout

registerRouteUi('/product/[url]', BottomDrawerUi)

export default ProductPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales }) => {
  const localePaths =
    locales?.map((locale) => {
      const client = apolloClient(localeToStore(locale))
      return getProductStaticPaths(client, locale)
    }) ?? []
  const paths = (await Promise.all(localePaths)).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  let urlKey = params?.url ?? '??'

  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))
  const config = client.query({ query: StoreConfigDocument })

  const page = staticClient.query({
    query: PageByUrlDocument,
    variables: { url: `product/${urlKey}` },
  })
  const productPage = staticClient.query({ query: ProductPageDocument, variables: { urlKey } })
  const pageLayout = staticClient.query({ query: PageLayoutDocument })

  urlKey = `${urlKey}${(await config)?.data.storeConfig?.product_url_suffix}`
  const resolveUrl = staticClient.query({ query: ResolveUrlDocument, variables: { urlKey } })

  return {
    props: {
      ...(await resolveUrl).data,
      ...(await pageLayout).data,
      ...(await productPage).data,
      ...(await page).data,
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}
