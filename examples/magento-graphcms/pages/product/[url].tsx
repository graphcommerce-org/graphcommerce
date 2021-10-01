import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  getProductStaticPaths,
  jsonLdProduct,
  jsonLdProductOffer,
  ProductAddToCart,
  productPageCategory,
  ProductPageGallery,
  ProductPageMeta,
  ProductSidebarDelivery,
  ProductWeight,
} from '@graphcommerce/magento-product'
import {
  SimpleProductPageDocument,
  SimpleProductPageQuery,
} from '@graphcommerce/magento-product-simple'
import { jsonLdProductReview, ProductReviewChip } from '@graphcommerce/magento-review'
import { StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, JsonLd, Title } from '@graphcommerce/next-ui'
import { Typography } from '@mui/material'
import { GetStaticPaths } from 'next'
import React from 'react'
import { Product } from 'schema-dts'
import FullPageShell, { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import FullPageShellHeader from '../../components/AppShell/FullPageShellHeader'
import { ProductPageDocument, ProductPageQuery } from '../../components/GraphQL/ProductPage.gql'
import ProductUsps from '../../components/ProductUsps'
import ProductpagesContent from '../../components/ProductpagesContent'
import RowProductDescription from '../../components/Row/RowProductDescription'
import RowProductFeature from '../../components/Row/RowProductFeature'
import RowProductFeatureBoxed from '../../components/Row/RowProductFeatureBoxed'
import RowProductRelated from '../../components/Row/RowProductRelated'
import RowProductReviews from '../../components/Row/RowProductReviews'
import RowProductSpecs from '../../components/Row/RowProductSpecs'
import RowProductUpsells from '../../components/Row/RowProductUpsells'
import apolloClient from '../../lib/apolloClient'

export const config = { unstable_JsPreload: false }

type Props = ProductPageQuery &
  SimpleProductPageQuery &
  Pick<FullPageShellProps, 'backFallbackTitle' | 'backFallbackHref'>

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

function ProductSimple(props: Props) {
  const {
    products,
    usps,
    sidebarUsps,
    typeProducts,
    productpages,
    backFallbackHref,
    backFallbackTitle,
  } = props

  const product = products?.items?.[0]
  const typeProduct = typeProducts?.items?.[0]
  const aggregations = typeProducts?.aggregations

  if (product?.__typename !== 'SimpleProduct' || typeProduct?.__typename !== 'SimpleProduct')
    return <div />

  return (
    <>
      <FullPageShellHeader
        backFallbackHref={backFallbackHref}
        backFallbackTitle={backFallbackTitle}
      >
        <Title size='small' component='span'>
          {product.name}
        </Title>
      </FullPageShellHeader>
      <JsonLd<Product>
        item={{
          '@context': 'https://schema.org',
          ...jsonLdProduct(product),
          ...jsonLdProductOffer(product),
          ...jsonLdProductReview(product),
        }}
      />

      <ProductPageMeta {...product} />
      <ProductPageGallery {...product}>
        <Typography variant='h3' component='div'>
          {product.name}
        </Typography>

        <Typography
          variant='body1'
          component='div'
          dangerouslySetInnerHTML={{ __html: product?.short_description?.html ?? '' }}
        />

        <ProductReviewChip rating={product.rating_summary} reviewSectionId='reviews' />
        <ProductAddToCart
          variables={{ sku: product.sku ?? '', quantity: 1 }}
          name={product.name ?? ''}
          price={product.price_range.minimum_price.regular_price}
        >
          <ProductSidebarDelivery />
        </ProductAddToCart>
        <ProductWeight weight={typeProduct?.weight} />
        <ProductUsps usps={sidebarUsps} size='small' />
      </ProductPageGallery>
      <RowProductDescription {...product} right={<ProductUsps usps={usps} />} />
      <ProductpagesContent
        renderer={{
          RowProductFeature: (rowProps) => <RowProductFeature {...rowProps} {...product} />,
          RowProductFeatureBoxed: (rowProps) => (
            <RowProductFeatureBoxed {...rowProps} {...product} />
          ),
          RowProductSpecs: (rowProps) => (
            <RowProductSpecs {...rowProps} {...product} aggregations={aggregations} />
          ),
          RowProductReviews: (rowProps) => <RowProductReviews {...rowProps} {...product} />,
          RowProductRelated: (rowProps) => <RowProductRelated {...rowProps} {...product} />,
          RowProductUpsells: (rowProps) => <RowProductUpsells {...rowProps} {...product} />,
        }}
        content={productpages?.[0].content}
      />
    </>
  )
}

ProductSimple.pageOptions = {
  SharedComponent: FullPageShell,
} as PageOptions

export default ProductSimple

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (locale: string) =>
    getProductStaticPaths(apolloClient(locale), locale, 'SimpleProduct')
  const paths = (await Promise.all(locales.map(path))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const urlKey = params?.url ?? '??'
  const productUrls = [`product/${urlKey}`, 'product/global']

  const conf = client.query({ query: StoreConfigDocument })
  const productPage = staticClient.query({
    query: ProductPageDocument,
    variables: {
      urlKey,
      productUrls,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })
  const typeProductPage = staticClient.query({
    query: SimpleProductPageDocument,
    variables: { urlKey },
  })

  if (
    (await productPage).data.products?.items?.[0]?.__typename !== 'SimpleProduct' ||
    (await typeProductPage).data.typeProducts?.items?.[0]?.__typename !== 'SimpleProduct'
  ) {
    return { notFound: true }
  }

  const category = productPageCategory((await productPage).data?.products?.items?.[0])
  return {
    props: {
      ...(await productPage).data,
      ...(await typeProductPage).data,
      apolloState: await conf.then(() => client.cache.extract()),
      backFallbackHref: category?.url_path ? `/${category?.url_path}` : null,
      backFallbackTitle: category?.name ?? null,
    },
    revalidate: 60 * 20,
  }
}
