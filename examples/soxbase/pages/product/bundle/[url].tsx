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
import ProductPageGallery from '@reachdigital/magento-product/ProductPageGallery'
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
import { UspsDocument, UspsQuery } from '../../../components/Usps/Usps.gql'
import apolloClient from '../../../lib/apolloClient'

type Props = ProductPageQuery &
  ProductPageAdditionalQuery &
  ProductByUrlQuery &
  ResolveUrlQuery &
  ProductBundleQuery &
  PageLayoutQuery &
  UspsQuery &
  FooterQuery
type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props, RouteProps>

function ProductBundle({
  products,
  productAdditionals,
  menu,
  urlResolver,
  footer,
  usps,
  bundleProducts,
  productpages,
}: Props) {
  if (!products) return <NextError statusCode={503} title='Loading skeleton' />

  const product = products?.items?.[0]
  const bundleProduct = bundleProducts?.items?.[0]
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
        <FabMenu menu={menu} urlResolver={urlResolver} />
        <Container maxWidth={false}>
          <ProductPageGallery {...product}>
            <Typography variant='h1'>{product.name ?? ''}</Typography>
            <AddToCartButton
              mutation={ProductAddToCartDocument}
              variables={{ sku: product.sku ?? '', quantity: 1 }}
            />
            <BundleItemsForm {...bundleProduct} />
          </ProductPageGallery>
        </Container>
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
        <Footer footer={footer} />
      </FullPageUi>
    </>
  )
}

ProductBundle.Layout = PageLayout

registerRouteUi('/product/bundle/[url]', FullPageUi)

export default ProductBundle

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

  const product = staticClient.query({
    query: ProductByUrlDocument,
    variables: { url: `product/global` },
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
  const Usps = staticClient.query({
    query: UspsDocument,
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
      ...(await product).data,
      ...(await Usps).data,
      ...(await bundleProduct).data,
      ...(await productAdditionals).data,
      apolloState: client.cache.extract(),
    },
    revalidate: 60 * 20,
  }
}
