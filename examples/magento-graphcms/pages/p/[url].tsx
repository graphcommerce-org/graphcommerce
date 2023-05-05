import { PageOptions } from '@graphcommerce/framer-next-pages'
import { HygraphPagesQuery } from '@graphcommerce/graphcms-ui'
import { hygraphPageContent } from '@graphcommerce/graphcms-ui/server'
import { mergeDeep } from '@graphcommerce/graphql'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import {
  AddProductsToCartButton,
  AddProductsToCartError,
  AddProductsToCartForm,
  AddProductsToCartFormProps,
  AddProductsToCartQuantity,
  jsonLdProduct,
  jsonLdProductOffer,
  ProductCustomizable,
  ProductPageAddToCartActionsRow,
  ProductPageAddToCartQuantityRow,
  productPageCategory,
  ProductPageDescription,
  ProductPageMeta,
  ProductPagePrice,
  ProductPagePriceTiers,
  ProductShortDescription,
  ProductSidebarDelivery,
} from '@graphcommerce/magento-product'
import { getProductStaticPaths } from '@graphcommerce/magento-product/server'
import { BundleProductOptions } from '@graphcommerce/magento-product-bundle'
import {
  ConfigurableName,
  ConfigurablePrice,
  ConfigurablePriceTiers,
  ConfigurableProductOptions,
  ConfigurableProductPageGallery,
} from '@graphcommerce/magento-product-configurable'
import { defaultConfigurableOptionsSelection } from '@graphcommerce/magento-product-configurable/server'
import { DownloadableProductOptions } from '@graphcommerce/magento-product-downloadable'
import { jsonLdProductReview, ProductReviewChip } from '@graphcommerce/magento-review'
import { Money } from '@graphcommerce/magento-store'
import { redirectOrNotFound } from '@graphcommerce/magento-store/server'
import { ProductWishlistChipDetail } from '@graphcommerce/magento-wishlist'
import {
  GetStaticProps,
  JsonLd,
  LayoutHeader,
  LayoutTitle,
  isTypename,
} from '@graphcommerce/next-ui'
import { enhanceStaticPaths, enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { Trans } from '@lingui/react'
import { Divider, Link, Typography } from '@mui/material'
import { GetStaticPaths } from 'next'
import {
  LayoutNavigation,
  LayoutNavigationProps,
  RowProduct,
  RowRenderer,
  Usps,
} from '../../components'
import { LayoutDocument } from '../../components/Layout/Layout.gql'
import { UspsDocument, UspsQuery } from '../../components/Usps/Usps.gql'
import { ProductPage2Document, ProductPage2Query } from '../../graphql/ProductPage2.gql'

type Props = HygraphPagesQuery &
  UspsQuery &
  ProductPage2Query &
  Pick<AddProductsToCartFormProps, 'defaultValues'>

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

          <ProductPageAddToCartQuantityRow product={product}>
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
          </ProductPageAddToCartQuantityRow>

          {isTypename(product, ['ConfigurableProduct']) ? (
            <ConfigurablePriceTiers product={product} />
          ) : (
            <ProductPagePriceTiers product={product} />
          )}

          <ProductSidebarDelivery product={product} />

          <ProductPageAddToCartActionsRow product={product}>
            <AddProductsToCartButton fullWidth product={product} />
            <ProductWishlistChipDetail {...product} />
          </ProductPageAddToCartActionsRow>

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

export const getStaticPaths = enhanceStaticPaths('blocking', getProductStaticPaths)

export const getStaticProps: GetPageStaticProps = enhanceStaticProps(async ({ params, locale }) => {
  const urlKey = params?.url ?? '??'
  const productPage = graphqlQuery(ProductPage2Document, { variables: { urlKey } })

  const product = productPage.then((pp) =>
    pp.data.products?.items?.find((p) => p?.url_key === urlKey),
  )

  const pages = hygraphPageContent('product/global', product, true)
  if (!(await product)) return redirectOrNotFound(params, locale)

  const category = productPageCategory(await product)
  const up =
    category?.url_path && category?.name
      ? { href: `/${category.url_path}`, title: category.name }
      : { href: `/`, title: 'Home' }
  const usps = graphqlQuery(UspsDocument, { fetchPolicy: 'cache-first' })

  return {
    props: {
      ...defaultConfigurableOptionsSelection(urlKey, (await productPage).data),
      ...(await graphqlQuery(LayoutDocument, { fetchPolicy: 'cache-first' })).data,
      ...(await pages).data,
      ...(await usps).data,
      up,
    },
    revalidate: 60 * 20,
  }
})
