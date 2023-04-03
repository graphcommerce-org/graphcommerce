import { PageOptions } from '@graphcommerce/framer-next-pages'
import { mergeDeep } from '@graphcommerce/graphql'
import {
  AddProductsToCartButton,
  AddProductsToCartError,
  AddProductsToCartForm,
  AddProductsToCartFormProps,
  AddProductsToCartQuantity,
  getProductStaticPaths,
  jsonLdProduct,
  jsonLdProductOffer,
  ProductCustomizable,
  productPageCategory,
  ProductPageDescription,
  ProductPageMeta,
  ProductPagePrice,
  ProductPagePriceTiers,
  ProductShortDescription,
  ProductSidebarDelivery,
} from '@graphcommerce/magento-product'
import { BundleProductOptions } from '@graphcommerce/magento-product-bundle'
import {
  ConfigurableName,
  ConfigurablePrice,
  ConfigurablePriceTiers,
  ConfigurableProductOptions,
  ConfigurableProductPageGallery,
  defaultConfigurableOptionsSelection,
} from '@graphcommerce/magento-product-configurable'
import { DownloadableProductOptions } from '@graphcommerce/magento-product-downloadable'
import { jsonLdProductReview, ProductReviewChip } from '@graphcommerce/magento-review'
import { redirectOrNotFound, Money, StoreConfigDocument } from '@graphcommerce/magento-store'
import { ProductWishlistChipDetail } from '@graphcommerce/magento-wishlist'
import {
  GetStaticProps,
  JsonLd,
  LayoutHeader,
  LayoutTitle,
  isTypename,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box, NoSsr, Divider, Link, Typography } from '@mui/material'
import { GetStaticPaths } from 'next'
import {
  LayoutNavigation,
  LayoutNavigationProps,
  RowProduct,
  RowRenderer,
  Usps,
} from '../../components'
import { CompareProductButton } from '../../components/CompareProducts/components/CompareProductButton'
import { FallbackCompareButton } from '../../components/CompareProducts/components/FallbackCompareButton'
import { LayoutDocument } from '../../components/Layout/Layout.gql'
import { ProductPage2Document, ProductPage2Query } from '../../graphql/ProductPage2.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type Props = ProductPage2Query & Pick<AddProductsToCartFormProps, 'defaultValues'>

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function ProductPage(props: Props) {
  const { products, relatedUpsells, usps, sidebarUsps, pages, defaultValues } = props

  const product = mergeDeep(products, relatedUpsells)?.items?.[0]

  if (!product?.sku || !product.url_key) return null

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

      <AddProductsToCartForm key={product.uid} defaultValues={defaultValues}>
        <ConfigurableProductPageGallery
          url_key={product.url_key}
          media_gallery={product.media_gallery}
          sx={(theme) => ({
            '& .SidebarGallery-sidebar': { display: 'grid', rowGap: theme.spacings.sm },
          })}
        >
          <div>
            {isTypename(product, ['ConfigurableProduct', 'BundleProduct']) && (
              <Typography component='div' variant='body2' color='text.disabled'>
                <Trans
                  id='As low as <0/>'
                  components={{ 0: <Money {...product.price_range.minimum_price.final_price} /> }}
                />
              </Typography>
            )}

            <Typography variant='h3' component='div' gutterBottom>
              {isTypename(product, ['ConfigurableProduct']) ? (
                <ConfigurableName product={product} />
              ) : (
                product.name
              )}
            </Typography>

            <ProductShortDescription
              short_description={product?.short_description}
              sx={(theme) => ({ mb: theme.spacings.xs })}
            />

            <ProductReviewChip rating={product.rating_summary} reviewSectionId='reviews' />
          </div>

          {isTypename(product, ['ConfigurableProduct']) && (
            <ConfigurableProductOptions
              product={product}
              optionEndLabels={{
                size: (
                  <Link
                    href='/modal/product/global/size'
                    rel='nofollow'
                    color='primary'
                    underline='hover'
                  >
                    <Trans id='Which size is right?' />
                  </Link>
                ),
              }}
            />
          )}
          {isTypename(product, ['BundleProduct']) && (
            <BundleProductOptions product={product} layout='stack' />
          )}
          {isTypename(product, ['DownloadableProduct']) && (
            <DownloadableProductOptions product={product} />
          )}
          {!isTypename(product, ['GroupedProduct']) && <ProductCustomizable product={product} />}

          <Divider />

          <Box
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              columnGap: theme.spacings.md,
            })}
          >
            <AddProductsToCartQuantity sx={{ flexShrink: '0' }} />

            <AddProductsToCartError>
              <Typography component='div' variant='h3' lineHeight='1'>
                {isTypename(product, ['ConfigurableProduct']) ? (
                  <ConfigurablePrice product={product} />
                ) : (
                  <ProductPagePrice product={product} />
                )}
              </Typography>
            </AddProductsToCartError>
          </Box>

          {isTypename(product, ['ConfigurableProduct']) ? (
            <ConfigurablePriceTiers product={product} />
          ) : (
            <ProductPagePriceTiers product={product} />
          )}

          <ProductSidebarDelivery product={product} />

          <Box
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'start',
              columnGap: theme.spacings.xs,
            })}
          >
            <AddProductsToCartButton fullWidth product={product} />
            <ProductWishlistChipDetail {...product} />
            <NoSsr fallback={<FallbackCompareButton />}>
              <CompareProductButton name={product.name} id_internal={product.id_internal} />
            </NoSsr>
          </Box>

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
                aggregations={products?.aggregations}
              />
            ),
          }}
        />
      )}
    </>
  )
}

ProductPage.pageOptions = {
  Layout: LayoutNavigation,
} as PageOptions

export default ProductPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  if (import.meta.graphCommerce.legacyProductRoute) return { paths: [], fallback: false }
  if (process.env.NODE_ENV === 'development') return { paths: [], fallback: 'blocking' }

  const path = (locale: string) => getProductStaticPaths(graphqlSsrClient(locale), locale)
  const paths = (await Promise.all(locales.map(path))).flat(1)

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async ({ params, locale }) => {
  if (import.meta.graphCommerce.legacyProductRoute) return { notFound: true }

  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)

  const urlKey = params?.url ?? '??'

  const conf = client.query({ query: StoreConfigDocument })
  const productPage = staticClient.query({
    query: ProductPage2Document,
    variables: { url: 'product/global', urlKey },
  })
  const layout = staticClient.query({ query: LayoutDocument })

  const product = (await productPage).data.products?.items?.find((p) => p?.url_key === urlKey)
  if (!product) return redirectOrNotFound(staticClient, conf, params, locale)

  const category = productPageCategory(product)
  const up =
    category?.url_path && category?.name
      ? { href: `/${category.url_path}`, title: category.name }
      : { href: `/`, title: 'Home' }

  return {
    props: {
      ...defaultConfigurableOptionsSelection(urlKey, client, (await productPage).data),
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
      up,
    },
    revalidate: 60 * 20,
  }
}
