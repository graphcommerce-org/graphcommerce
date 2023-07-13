import { PageOptions } from '@graphcommerce/framer-next-pages'
import { hygraphPageContent, HygraphPagesQuery } from '@graphcommerce/graphcms-ui'
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
  ProductName,
  ProductPageAddToCartActionsRow,
  ProductPageAddToCartQuantityRow,
  productPageCategory,
  ProductPageDescription,
  ProductPageGallery,
  ProductPageMeta,
  ProductPagePrice,
  ProductPagePriceTiers,
  ProductShortDescription,
  ProductSidebarDelivery,
} from '@graphcommerce/magento-product'
import { BundleProductOptions } from '@graphcommerce/magento-product-bundle'
import {
  ConfigurableProductJsonLd,
  ConfigurableProductOptions,
  ConfigurableProductUrls,
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
import { Divider, Link, Typography } from '@mui/material'
import { GetStaticPaths } from 'next'
import {
  LayoutDocument,
  LayoutNavigation,
  LayoutNavigationProps,
  RowProduct,
  RowRenderer,
  Usps,
} from '../../components'
import { UspsDocument, UspsQuery } from '../../components/Usps/Usps.gql'
import { ProductPage2Document, ProductPage2Query } from '../../graphql/ProductPage2.gql'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type Props = HygraphPagesQuery &
  UspsQuery &
  ProductPage2Query &
  Pick<AddProductsToCartFormProps, 'defaultValues'>

type RouteProps = { url: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props, RouteProps>

function ProductPage(props: Props) {
  const { products, relatedUpsells, usps, sidebarUsps, pages, defaultValues } = props

  const product = mergeDeep(
    products?.items?.[0],
    relatedUpsells?.items?.find((item) => item?.uid === products?.items?.[0]?.uid),
  )

  if (!product?.sku || !product.url_key) return null

  return (
    <>
      <AddProductsToCartForm key={product.uid} defaultValues={defaultValues}>
        <LayoutHeader floatingMd>
          <LayoutTitle size='small' component='span'>
            <ProductName product={product} />
          </LayoutTitle>
        </LayoutHeader>
        {isTypename(product, ['ConfigurableProduct']) ? (
          <ConfigurableProductJsonLd product={product} />
        ) : (
          <JsonLd
            item={{
              '@context': 'https://schema.org',
              ...jsonLdProduct(product),
              ...jsonLdProductOffer(product),
              ...jsonLdProductReview(product),
            }}
          />
        )}

        <ProductPageMeta {...product} />
        {isTypename(product, ['ConfigurableProduct']) && (
          <ConfigurableProductUrls product={product} />
        )}
        <ProductPageGallery
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
              <ProductName product={product} />
            </Typography>
            <ProductShortDescription sx={(theme) => ({ mb: theme.spacings.xs })} {...product} />
            <ProductReviewChip
              rating={product.rating_summary}
              url_key={product.url_key}
              reviewSectionId='reviews'
            />
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

          <ProductPageAddToCartQuantityRow product={product}>
            <AddProductsToCartQuantity sx={{ flexShrink: '0' }} />

            <AddProductsToCartError>
              <Typography component='div' variant='h3' lineHeight='1'>
                <ProductPagePrice product={product} />
              </Typography>
            </AddProductsToCartError>
          </ProductPageAddToCartQuantityRow>

          <ProductPagePriceTiers product={product} />

          <ProductSidebarDelivery product={product} />

          <ProductPageAddToCartActionsRow product={product}>
            <AddProductsToCartButton fullWidth product={product} />
            <ProductWishlistChipDetail {...product} />
          </ProductPageAddToCartActionsRow>

          <Usps usps={sidebarUsps} size='small' />
        </ProductPageGallery>

        <ProductPageDescription
          product={product}
          right={<Usps usps={usps} />}
          fontSize='responsive'
        />
      </AddProductsToCartForm>

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
  const productPage = staticClient.query({ query: ProductPage2Document, variables: { urlKey } })
  const layout = staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })

  const product = productPage.then((pp) =>
    pp.data.products?.items?.find((p) => p?.url_key === urlKey),
  )

  const pages = hygraphPageContent(staticClient, 'product/global', product, true)
  if (!(await product)) return redirectOrNotFound(staticClient, conf, params, locale)

  const category = productPageCategory(await product)
  const up =
    category?.url_path && category?.name
      ? { href: `/${category.url_path}`, title: category.name }
      : { href: `/`, title: 'Home' }
  const usps = staticClient.query({ query: UspsDocument, fetchPolicy: 'cache-first' })

  return {
    props: {
      ...defaultConfigurableOptionsSelection(urlKey, client, (await productPage).data),
      ...(await layout).data,
      ...(await pages).data,
      ...(await usps).data,
      apolloState: await conf.then(() => client.cache.extract()),
      up,
    },
    revalidate: 60 * 20,
  }
}
