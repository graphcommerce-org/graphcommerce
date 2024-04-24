import {
  AddProductsToCartButton,
  AddProductsToCartError,
  AddProductsToCartQuantity,
  ProductCustomizable,
  ProductPageAddToCartActionsRow,
  ProductPageAddToCartQuantityRow,
  ProductPagePrice,
  ProductPagePriceTiers,
  ProductSidebarDelivery,
} from '@graphcommerce/magento-product'
import { BundleProductOptions } from '@graphcommerce/magento-product-bundle'
import { ConfigurableProductOptions } from '@graphcommerce/magento-product-configurable'
import { DownloadableProductOptions } from '@graphcommerce/magento-product-downloadable'
import { ProductWishlistChipDetail } from '@graphcommerce/magento-wishlist'
import { isTypename } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Divider, Link, Typography } from '@mui/material'
import { ProductPage2Query } from '../graphql/ProductPage2.gql'

export type AddProductsToCartViewProps = {
  product: NonNullable<NonNullable<NonNullable<ProductPage2Query['products']>['items']>[number]>
}

export function AddProductsToCartView(props: AddProductsToCartViewProps) {
  const { product } = props

  return (
    <>
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
    </>
  )
}
