import { Container } from '@material-ui/core'
import MenuTabs from '@reachdigital/magento-app-shell/MenuTabs'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument, PageLayoutQuery } from '@reachdigital/magento-app-shell/PageLayout.gql'
import AddToCartButton from '@reachdigital/magento-cart/AddToCartButton'
import {
  ProductPageDocument,
  ProductPageQuery,
} from '@reachdigital/magento-product-types/ProductPage.gql'
import {
  ProductPageAdditionalDocument,
  ProductPageAdditionalQuery,
} from '@reachdigital/magento-product-types/ProductPageAdditional.gql'
import {
  ProductVirtualDocument,
  ProductVirtualQuery,
} from '@reachdigital/magento-product-virtual/ProductVirtual.gql'
import { ProductAddToCartDocument } from '@reachdigital/magento-product/ProductAddToCart/ProductAddToCart.gql'
import productPageCategory from '@reachdigital/magento-product/ProductPageCategory'
import ProductPageMeta from '@reachdigital/magento-product/ProductPageMeta'
import getProductStaticPaths from '@reachdigital/magento-product/ProductStaticPaths/getProductStaticPaths'
import { ResolveUrlDocument, ResolveUrlQuery } from '@reachdigital/magento-store/ResolveUrl.gql'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import FullPageUi from '@reachdigital/next-ui/AppShell/FullPageUi'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import { GetStaticPaths, GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import NextError from 'next/error'
import React from 'react'
import Footer from '../../../components/Footer'
import { FooterQuery } from '../../../components/Footer/Footer.gql'
import HeaderActions from '../../../components/HeaderActions/HeaderActions'
import Logo from '../../../components/Logo/Logo'
import { PageByUrlDocument } from '../../../components/Page/PageByUrl.gql'
import Product from '../../../components/Product'
import {
  ProductByUrlDocument,
  ProductByUrlQuery,
} from '../../../components/Product/ProductByUrl.gql'
import RowProductDescription from '../../../components/RowProductDescription'
import RowProductFeature from '../../../components/RowProductFeature'
import RowProductFeatureBoxed from '../../../components/RowProductFeatureBoxed'
import RowProductRelated from '../../../components/RowProductRelated'
import RowProductReviews from '../../../components/RowProductReviews'
import RowProductSpecs from '../../../components/RowProductSpecs'
import RowProductUpsells from '../../../components/RowProductUpsells'
import ProductUsps from '../../../components/Usps'
import { UspsQuery } from '../../../components/Usps/Usps.gql'
import apolloClient from '../../../lib/apolloClient'

type Props = ProductPageQuery &
  ProductPageAdditionalQuery &
  ProductByUrlQuery &
  ResolveUrlQuery &
  ProductVirtualQuery &
  PageLayoutQuery &
  UspsQuery &
  FooterQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

function ProductVitual({
  products,
  productAdditionals,
  menu,
  urlResolver,
  footer,
  usps,
  virtualProducts,
  productpages,
}: Props) {
  if (!products) return <NextError statusCode={503} title='Loading skeleton' />

  const product = products?.items?.[0]
  const asdf = virtualProducts?.items?.[0]?.options
  const additional = productAdditionals?.items?.[0]

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
          <RowProductDescription {...product}>
            <ProductUsps usps={usps} />
          </RowProductDescription>

          <Product
            renderer={{
              RowProductFeature: (props) => <RowProductFeature {...props} {...product} />,
              RowProductFeatureBoxed: (props) => <RowProductFeatureBoxed {...props} {...product} />,
              RowProductSpecs: (props) => <RowProductSpecs {...props} {...productAdditionals} />,
              RowProductReviews: (props) => <RowProductReviews {...props} {...product} />,
              RowProductRelated: (props) => <RowProductRelated {...props} {...additional} />,
              RowProductUpsells: (props) => <RowProductUpsells {...props} {...additional} />,
            }}
            content={productpages?.[0].content}
          />
        </Container>
        <Footer footer={footer} />
      </FullPageUi>
    </>
  )
}

ProductVitual.Layout = PageLayout

registerRouteUi('/product/virtual/[url]', OverlayUi)

export default ProductVitual

export const getStaticPaths: GetPageStaticPaths = async ({ locales }) => {
  const localePaths =
    locales?.map((locale) => {
      const client = apolloClient(localeToStore(locale))
      return getProductStaticPaths(client, locale, 'VirtualProduct')
    }) ?? []
  const paths = (await Promise.all(localePaths)).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const urlKey = params?.url ?? '??'

  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))
  const config = client.query({ query: StoreConfigDocument })

  const product = staticClient.query({
    query: ProductByUrlDocument,
    variables: { url: `product/global` },
  })
  const productPage = staticClient.query({
    query: ProductPageDocument,
    variables: { urlKey },
  })
  const virtualProduct = staticClient.query({
    query: ProductVirtualDocument,
    variables: { urlKey },
  })
  const productAdditionals = staticClient.query({
    query: ProductPageAdditionalDocument,
    variables: { urlKey },
  })
  const pageLayout = staticClient.query({
    query: PageLayoutDocument,
  })
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
      ...(await productPage).data,
      ...(await product).data,
      ...(await page).data,
      ...(await virtualProduct).data,
      ...(await productAdditionals).data,
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}
