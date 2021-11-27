import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  getProductStaticPaths,
  jsonLdProduct,
  jsonLdProductOffer,
  productPageCategory,
  ProductPageDescription,
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
import { RowProduct } from '../../../components/Row'
import RowRenderer from '../../../components/Row/RowRenderer'
import Usps from '../../../components/Usps'
import apolloClient from '../../../lib/apolloClient'

type Props = ProductPageQuery & ConfigurableProductPageQuery

const useStyles = makeStyles(
  (theme: Theme) => ({
    prePrice: {
      color: theme.palette.text.disabled,
    },
  }),
  { name: 'ProductConfigurable' },
)

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props, RouteProps>

function ProductConfigurable(props: Props) {
  const { products, usps, typeProducts, sidebarUsps, pages } = props
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
      <FullPageShellHeader>
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
            <Typography component='span' variant='body2' className={classes.prePrice}>
              <Trans>As low as</Trans>&nbsp;
              <Money {...product.price_range.minimum_price.regular_price} />
            </Typography>
          </div>
          <Typography variant='h3' component='div' gutterBottom>
            {product.name}
          </Typography>

          <ProductShortDescription short_description={product?.short_description} />

          <ProductReviewChip
            rating={product.rating_summary}
            reviewSectionId='reviews'
            size='small'
          />
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
          <Usps usps={sidebarUsps} size='small' />
        </ProductPageGallery>

        <ProductPageDescription {...product} right={<Usps usps={usps} />} />

        {pages?.[0] && (
          <RowRenderer
            content={pages?.[0].content}
            renderer={{
              RowProduct: (rowProps) => (
                <RowProduct
                  {...rowProps}
                  {...product}
                  items={products?.items}
                  aggregations={aggregations}
                />
              ),
            }}
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

  const up =
    category?.url_path && category?.name
      ? { href: `/${category.url_path}`, title: category.name }
      : { href: `/`, title: 'Home' }

  return {
    props: {
      ...(await productPage).data,
      ...(await typeProductPage).data,
      apolloState: await conf.then(() => client.cache.extract()),
      up,
    },
    revalidate: 60 * 20,
  }
}
