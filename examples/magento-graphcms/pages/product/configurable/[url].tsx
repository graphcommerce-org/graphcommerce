import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  AddToCartButton,
  AddToCartQuantity,
  AddToCartSnackbar,
  getProductStaticPaths,
  jsonLdProduct,
  jsonLdProductOffer,
  ProductAddToCartForm,
  productPageCategory,
  ProductPageDescription,
  ProductPageMeta,
  ProductShortDescription,
  ProductSidebarDelivery,
} from '@graphcommerce/magento-product'
import {
  ConfigurableAddToCartPrice,
  ConfigurableOptionsInput,
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
  SchemaDts,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, Divider, Link, Typography } from '@mui/material'
import { GetStaticPaths } from 'next'
import PageLink from 'next/link'
import { LayoutFull, LayoutFullProps, RowProduct, RowRenderer, Usps } from '../../../components'
import { ProductPageDocument, ProductPageQuery } from '../../../graphql/ProductPage.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../../lib/graphql/graphqlSsrClient'

type Props = ProductPageQuery & GetConfigurableProductConfigurationsQuery

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutFullProps, Props, RouteProps>

function ProductConfigurable(props: Props) {
  const { products, usps, typeProducts, sidebarUsps, pages } = props

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
      <JsonLd<SchemaDts.Product>
        item={{
          '@context': 'https://schema.org',
          ...jsonLdProduct(product),
          ...jsonLdProductOffer(product),
          ...jsonLdProductReview(product),
        }}
      />
      <ProductPageMeta {...product} />

      <ProductAddToCartForm sku={product.sku} urlKey={product.url_key} typeProduct={typeProduct}>
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

          <ConfigurableOptionsInput
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
          <AddToCartQuantity />

          <Typography component='div' variant='h3' lineHeight='1'>
            <ConfigurableAddToCartPrice />
          </Typography>

          <ProductSidebarDelivery />
          <Box
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              columnGap: theme.spacings.xs,
            })}
          >
            <AddToCartButton sx={{ width: '100%' }} />
            <ProductWishlistChipDetail {...product} />
          </Box>

          <AddToCartSnackbar name={product.name} />
          <Usps usps={sidebarUsps} size='small' />
        </ConfigurableProductPageGallery>
      </ProductAddToCartForm>

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
  Layout: LayoutFull,
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
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })
  const typeProductPage = staticClient.query({
    query: GetConfigurableProductConfigurationsDocument,
    variables: { urlKey, selectedOptions: [] },
  })

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
      apolloState: await conf.then(() => client.cache.extract()),
      up,
    },
    revalidate: 60 * 20,
  }
}
