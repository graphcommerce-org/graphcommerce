import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  getProductStaticPaths,
  jsonLdProduct,
  jsonLdProductOffer,
  AddProductsToCartQuantity,
  AddProductsToCartSnackbar,
  productPageCategory,
  ProductPageDescription,
  ProductPageMeta,
  ProductShortDescription,
  AddProductsToCartForm,
} from '@graphcommerce/magento-product'
import {
  ConfigurableAddToCartButton,
  ConfigurablePrice,
  ConfigurableProductOptions,
  ConfigurableProductPageGallery,
  GetConfigurableProductConfigurationsDocument,
  GetConfigurableProductConfigurationsQuery,
} from '@graphcommerce/magento-product-configurable'
import { jsonLdProductReview, ProductReviewChip } from '@graphcommerce/magento-review'
import { Money, StoreConfigDocument } from '@graphcommerce/magento-store'
import { ProductWishlistChipDetail } from '@graphcommerce/magento-wishlist'
import {
  findByTypename,
  GetStaticProps,
  JsonLd,
  LayoutHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Divider, Link, Typography } from '@mui/material'
import { GetStaticPaths } from 'next'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import {
  LayoutNavigation,
  LayoutNavigationProps,
  RowProduct,
  RowRenderer,
  Usps,
} from '../../../components'
import { LayoutDocument } from '../../../components/Layout/Layout.gql'
import { ProductPageDocument, ProductPageQuery } from '../../../graphql/ProductPage.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../../lib/graphql/graphqlSsrClient'

type Props = ProductPageQuery & GetConfigurableProductConfigurationsQuery

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function ProductConfigurable(props: Props) {
  const { products, usps, typeProducts, sidebarUsps, pages } = props

  const router = useRouter()
  const product = findByTypename(products?.items, 'ConfigurableProduct')
  const typeProduct = findByTypename(typeProducts?.items, 'ConfigurableProduct')
  const aggregations = products?.aggregations

  if (!product?.sku || !product.url_key || !typeProduct) return null

  return (
    <>
      <LayoutHeader floatingMd>
        <LayoutTitle size='small' component='span'>
          {product.name}
        </LayoutTitle>
      </LayoutHeader>
      <JsonLd
        item={{
          '@context': 'https://schema.org',
          ...jsonLdProduct(product),
          ...jsonLdProductOffer(product),
          ...jsonLdProductReview(product),
        }}
      />
      <ProductPageMeta {...product} />

      <AddProductsToCartForm sku={product.sku} urlKey={product.url_key} typeProduct={typeProduct}>
        <ConfigurableProductPageGallery
          {...product}
          sx={(theme) => ({
            '& .SidebarGallery-sidebar': { display: 'grid', rowGap: theme.spacings.sm },
          })}
        >
          <div>
            <Typography component='div' variant='body2' color='text.disabled'>
              <Trans
                id='As low as <0/>'
                components={{ 0: <Money {...product.price_range.minimum_price.final_price} /> }}
              />
            </Typography>

            <Typography variant='h3' component='div' gutterBottom>
              {product.name}
            </Typography>

            <ProductShortDescription short_description={product?.short_description} />

            <ProductReviewChip rating={product.rating_summary} reviewSectionId='reviews' />
          </div>

          <Divider />

          <ConfigurableProductOptions
            optionEndLabels={{
              size: (
                <PageLink href='/modal/product/global/size'>
                  <Link rel='nofollow' component='button' color='primary' underline='hover'>
                    <Trans id='Which size is right?' />
                  </Link>
                </PageLink>
              ),
            }}
          />

          <Divider />
          <AddProductsToCartQuantity />

          <Typography component='div' variant='h3' lineHeight='1'>
            <ConfigurablePrice price_range={product.price_range} />
          </Typography>

          <Box
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              columnGap: theme.spacings.xs,
            })}
          >
            <ConfigurableAddToCartButton fullWidth />
            <ProductWishlistChipDetail {...product} />
          </Box>

          <AddProductsToCartSnackbar name={product.name} />
          <Usps usps={sidebarUsps} size='small' />
        </ConfigurableProductPageGallery>
      </AddProductsToCartForm>

      <ProductPageDescription {...product} right={<Usps usps={usps} />} fontSize='responsive' />

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
    </>
  )
}

ProductConfigurable.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default ProductConfigurable

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (locale: string) =>
    getProductStaticPaths(graphqlSsrClient(locale), locale, 'ConfigurableProduct')
  const paths = (await Promise.all(locales.map(path))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)

  const urlKey = params?.url ?? '??'

  const conf = client.query({ query: StoreConfigDocument })
  const productPage = staticClient.query({
    query: ProductPageDocument,
    variables: {
      url: 'product/global',
      urlKey,
    },
  })
  const typeProductPage = staticClient.query({
    query: GetConfigurableProductConfigurationsDocument,
    variables: { urlKey, selectedOptions: [] },
  })
  const layout = staticClient.query({ query: LayoutDocument })

  const product = findByTypename((await productPage).data.products?.items, 'ConfigurableProduct')
  const typeProduct = findByTypename(
    (await typeProductPage).data.typeProducts?.items,
    'ConfigurableProduct',
  )
  if (!product || !typeProduct) return { notFound: true }

  const category = productPageCategory((await productPage).data?.products?.items?.[0])

  const up =
    category?.url_path && category?.name
      ? { href: `/${category.url_path}`, title: category.name }
      : { href: `/`, title: 'Home' }

  return {
    props: {
      ...(await productPage).data,
      ...(await typeProductPage).data,
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
      up,
    },
    revalidate: 60 * 20,
  }
}
