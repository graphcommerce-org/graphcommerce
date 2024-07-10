import {
  AddProductsToCartError,
  AddProductsToCartQuantity,
  ProductCustomizable,
  ProductPageAddToCartQuantityRow,
  ProductPagePrice,
  ProductPagePriceTiers,
  ProductSidebarDelivery,
} from '@graphcommerce/magento-product'
import { BundleProductOptions } from '@graphcommerce/magento-product-bundle'
import { ConfigurableProductOptions } from '@graphcommerce/magento-product-configurable'
import { DownloadableProductOptions } from '@graphcommerce/magento-product-downloadable'
import { GroupedProducts } from '@graphcommerce/magento-product-grouped'
import { isTypename } from '@graphcommerce/next-ui'
import { Divider, Typography } from '@mui/material'
import { ProductPage2Query } from '../../graphql/ProductPage2.gql'

export type AddProductsToCartViewProps = {
  product: NonNullable<NonNullable<NonNullable<ProductPage2Query['products']>['items']>[number]>
}

export function AddProductsToCartView(props: AddProductsToCartViewProps) {
  const { product } = props

  return (
    <>
      {isTypename(product, ['ConfigurableProduct']) && (
        <ConfigurableProductOptions product={product} />
      )}
      {isTypename(product, ['BundleProduct']) && (
        <BundleProductOptions product={product} layout='stack' />
      )}
      {isTypename(product, ['DownloadableProduct']) && (
        <DownloadableProductOptions product={product} />
      )}
      {isTypename(product, ['GroupedProduct']) && <GroupedProducts product={product} />}

      {!isTypename(product, ['GroupedProduct']) && (
        <>
          <ProductCustomizable product={product} />
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
        </>
      )}
    </>
  )
}
