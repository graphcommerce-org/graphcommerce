'use client'

import { mergeDeep, PrivateQueryMaskProvider, usePrivateQuery } from '@graphcommerce/graphql'
import type { AddProductsToCartFormProps } from '@graphcommerce/magento-product'
import {
  AddProductsToCartButton,
  AddProductsToCartForm,
  jsonLdProduct,
  jsonLdProductOffer,
  ProductPageAddToCartActionsRow,
  ProductPageBreadcrumbs,
  ProductPageDescription,
  ProductPageGallery,
  ProductPageJsonLd,
  ProductPageMeta,
  ProductPageName,
  ProductPagePriceLowest,
  ProductScroller,
  ProductShortDescription,
  ProductSpecs,
} from '@graphcommerce/magento-product'
import { RecentlyViewedProducts } from '@graphcommerce/magento-recently-viewed-products'
import { jsonLdProductReview, ProductReviewChip } from '@graphcommerce/magento-review'
import { ProductWishlistChipDetail } from '@graphcommerce/magento-wishlist'
import { breadcrumbs, magentoVersion } from '@graphcommerce/next-config/config'
import {
  Container,
  isTypename,
  LayoutHeader,
  LayoutTitle,
  nonNullable,
  responsiveVal,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import { Typography } from '@mui/material'
import { AddProductsToCartView, productListRenderer, Reviews } from '../../../../components'
import type { ProductPage2Query } from '../../../../graphql/ProductPage2.gql'
import { ProductPage2Document } from '../../../../graphql/ProductPage2.gql'

export type ProductClientProps = ProductPage2Query &
  Pick<AddProductsToCartFormProps, 'defaultValues'> & { urlKey: string }

export function ProductClient(props: ProductClientProps) {
  const { defaultValues, urlKey } = props

  const scopedQuery = usePrivateQuery(
    ProductPage2Document,
    { variables: { urlKey, useCustomAttributes: magentoVersion >= 247 } },
    props,
  )
  const { products, relatedUpsells } = scopedQuery.data

  const product = mergeDeep(
    products?.items?.[0],
    relatedUpsells?.items?.find((item) => item?.uid === products?.items?.[0]?.uid),
  )

  if (!product?.sku || !product.url_key) return null

  return (
    <PrivateQueryMaskProvider mask={scopedQuery.mask}>
      <AddProductsToCartForm key={product.uid} defaultValues={defaultValues}>
        <LayoutHeader floatingMd hideMd={breadcrumbs}>
          <LayoutTitle size='small' component='span'>
            <ProductPageName product={product} />
          </LayoutTitle>
        </LayoutHeader>

        <ProductPageJsonLd
          product={product}
          render={(p) => ({
            '@context': 'https://schema.org',
            ...jsonLdProduct(p),
            ...jsonLdProductOffer(p),
            ...jsonLdProductReview(p),
          })}
        />

        <ProductPageMeta product={product} />

        {breadcrumbs && (
          <Container
            maxWidth={false}
            sx={(theme) => ({ py: `calc(${theme.spacings.xxs} / 2)`, bgcolor: 'background.paper' })}
            breakoutRight
          >
            <ProductPageBreadcrumbs
              product={product}
              sx={(theme) => ({
                [theme.breakpoints.down('md')]: {
                  '& .MuiBreadcrumbs-ol': { justifyContent: 'center' },
                },
              })}
            />
          </Container>
        )}

        <ProductPageGallery
          product={product}
          sx={(theme) => ({
            '& .SidebarGallery-sidebar': { display: 'grid', rowGap: theme.spacings.sm },
          })}
          disableSticky
        >
          <div>
            {isTypename(product, ['ConfigurableProduct', 'BundleProduct']) && (
              <ProductPagePriceLowest product={product} sx={{ color: 'text.disabled' }} />
            )}
            <Typography variant='h3' component='div' gutterBottom>
              <ProductPageName product={product} />
            </Typography>
            <ProductShortDescription
              sx={(theme) => ({ mb: theme.spacings.xs })}
              product={product}
            />
            <ProductReviewChip rating={product.rating_summary} reviewSectionId='reviews' />
          </div>

          <AddProductsToCartView product={product} />

          <ProductPageAddToCartActionsRow product={product}>
            <AddProductsToCartButton fullWidth product={product} />
            <ProductWishlistChipDetail {...product} />
          </ProductPageAddToCartActionsRow>
        </ProductPageGallery>

        <ProductPageDescription
          product={product}
          fontSize='responsive'
          right=''
          productListRenderer={productListRenderer}
        />
      </AddProductsToCartForm>

      <ProductSpecs title='Specs' {...products} />

      <Reviews title='Reviews' {...product} />

      {product.related_products && product.related_products.length > 0 && (
        <ProductScroller
          title='Looking Similar'
          items={product.related_products.filter(nonNullable)}
          productListRenderer={productListRenderer}
          sizes={responsiveVal(200, 400)}
          itemScrollerProps={{
            sx: (theme) => ({
              mb: theme.spacings.xxl,
              '& .ItemScroller-scroller': { gridAutoColumns: responsiveVal(200, 400) },
            }),
          }}
        />
      )}

      {product.upsell_products && product.upsell_products.length > 0 && (
        <ProductScroller
          title='You may also like'
          items={product.upsell_products.filter(nonNullable)}
          productListRenderer={productListRenderer}
          sizes={responsiveVal(200, 400)}
          itemScrollerProps={{
            sx: (theme) => ({
              mb: theme.spacings.xxl,
              '& .ItemScroller-scroller': { gridAutoColumns: responsiveVal(200, 400) },
            }),
          }}
        />
      )}

      <RecentlyViewedProducts
        title={<Trans>Recently viewed products</Trans>}
        exclude={[product.sku]}
        productListRenderer={productListRenderer}
        sizes={responsiveVal(200, 400)}
        itemScrollerProps={{
          sx: (theme) => ({
            mb: theme.spacings.xxl,
            '& .ItemScroller-scroller': { gridAutoColumns: responsiveVal(200, 400) },
          }),
        }}
        sx={(theme) => ({ mb: theme.spacings.xxl })}
      />
    </PrivateQueryMaskProvider>
  )
}
