import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  getProductStaticPaths,
  jsonLdProduct,
  jsonLdProductOffer,
  productPageCategory,
  ProductPageGallery,
  ProductPageMeta,
  ProductShortDescription,
  ProductSidebarDelivery,
} from '@graphcommerce/magento-product'
import {
  ConfigurableContextProvider,
  ConfigurableProductAddToCart,
  ConfigurableProductPageDocument,
  ConfigurableProductPageQuery,
} from '@graphcommerce/magento-product-configurable'
import { jsonLdProductReview, ProductReviewChip } from '@graphcommerce/magento-review'
import { Money, StoreConfigDocument } from '@graphcommerce/magento-store'
import { GetStaticProps, JsonLd, Title } from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Link, makeStyles, Theme, Typography } from '@material-ui/core'
import { GetStaticPaths } from 'next'
import PageLink from 'next/link'
import React from 'react'
import { Product } from 'schema-dts'
import FullPageShell, { FullPageShellProps } from '../../../components/AppShell/FullPageShell'
import FullPageShellHeader from '../../../components/AppShell/FullPageShellHeader'
import { ProductPageDocument, ProductPageQuery } from '../../../components/GraphQL/ProductPage.gql'
import PageContent from '../../../components/PageContent'
import RowProductDescription from '../../../components/ProductDescription'
import ProductUsps from '../../../components/ProductUsps'
import {
  RowProduct,
  Backstory,
  Feature,
  FeatureBoxed,
  Grid,
  Related,
  Reviews,
  Specs,
  Swipeable,
  Upsells,
} from '../../../components/Row'
import apolloClient from '../../../lib/apolloClient'

type Props = ProductPageQuery &
  ConfigurableProductPageQuery &
  Pick<FullPageShellProps, 'backFallbackHref' | 'backFallbackTitle'>

const useStyles = makeStyles(
  (theme: Theme) => ({
    prePrice: {
      color: theme.palette.primary.mutedText,
    },
  }),
  { name: 'ProductConfigurable' },
)

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

function ProductConfigurable(props: Props) {
  const { products, usps, typeProducts, sidebarUsps, pages, backFallbackHref, backFallbackTitle } =
    props
  const classes = useStyles()

  const product = products?.items?.[0]
  const typeProduct = typeProducts?.items?.[0]
  const aggregations = typeProducts?.aggregations

  if (
    product?.__typename !== 'ConfigurableProduct' ||
    typeProduct?.__typename !== 'ConfigurableProduct' ||
    !product.sku
  )
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
      <ConfigurableContextProvider {...typeProduct} sku={product.sku}>
        <ProductPageMeta {...product} />
        <ProductPageGallery {...product}>
          <div>
            <Typography component='span' className={classes.prePrice} variant='body2'>
              <Trans>As low as</Trans>&nbsp;
            </Typography>
            <Typography component='span' variant='h6'>
              <Money {...product.price_range.minimum_price.regular_price} />
            </Typography>
          </div>
          <Typography variant='h3' component='div'>
            {product.name}
          </Typography>

          <ProductShortDescription short_description={product?.short_description} />

          <ProductReviewChip rating={product.rating_summary} reviewSectionId='reviews' />
          <ConfigurableProductAddToCart
            variables={{ sku: product.sku ?? '', quantity: 1 }}
            name={product.name ?? ''}
            optionEndLabels={{
              size: (
                <PageLink href='/modal/product/global/size' passHref>
                  <Link color='primary'>
                    <Trans>Which size is right?</Trans>
                  </Link>
                </PageLink>
              ),
            }}
          >
            <ProductSidebarDelivery />
          </ConfigurableProductAddToCart>
          <ProductUsps usps={sidebarUsps} size='small' />
        </ProductPageGallery>

        <RowProductDescription {...product} right={<ProductUsps usps={usps} />} />

        {pages?.[0] && (
          <PageContent
            renderer={{
              RowProduct: (rowProps) => (
                <RowProduct
                  {...rowProps}
                  renderer={{
                    Specs: (rowProductProps) => (
                      <Specs {...rowProductProps} {...product} aggregations={aggregations} />
                    ),
                    Backstory: (rowProductProps) => (
                      <Backstory {...rowProductProps} items={products?.items} />
                    ),
                    Feature: (rowProductProps) => <Feature {...rowProductProps} {...product} />,
                    FeatureBoxed: (rowProductProps) => (
                      <FeatureBoxed {...rowProductProps} {...product} />
                    ),
                    Grid: (rowProductProps) => (
                      <Grid {...rowProductProps} items={products?.items} />
                    ),
                    Related: (rowProductProps) => <Related {...rowProductProps} {...product} />,
                    Reviews: (rowProductProps) => <Reviews {...rowProductProps} {...product} />,
                    Upsells: (rowProductProps) => <Upsells {...rowProductProps} {...product} />,
                    Swipeable: (rowProductProps) => (
                      <Swipeable {...rowProductProps} items={products?.items} />
                    ),
                  }}
                />
              ),
            }}
            content={pages?.[0].content}
          />
        )}
      </ConfigurableContextProvider>
    </>
  )
}

ProductConfigurable.pageOptions = {
  SharedComponent: FullPageShell,
} as PageOptions

export default ProductConfigurable

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (locale: string) =>
    getProductStaticPaths(apolloClient(locale), locale, 'ConfigurableProduct')
  const paths = (await Promise.all(locales.map(path))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const urlKey = params?.url ?? '??'

  const conf = client.query({ query: StoreConfigDocument })
  const productPage = staticClient.query({
    query: ProductPageDocument,
    variables: {
      url: 'product/global',
      urlKey,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })
  const typeProductPage = staticClient.query({
    query: ConfigurableProductPageDocument,
    variables: { urlKey },
  })

  if (
    (await productPage).data.products?.items?.[0]?.__typename !== 'ConfigurableProduct' ||
    (await typeProductPage).data.typeProducts?.items?.[0]?.__typename !== 'ConfigurableProduct'
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
