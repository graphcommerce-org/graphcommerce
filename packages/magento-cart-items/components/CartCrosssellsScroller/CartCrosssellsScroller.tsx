import { useCrosssellItems } from '@graphcommerce/magento-cart/components/CartAdded/useCrosssellItems'
import type { ProductListItemRenderer, ProductScrollerProps } from '@graphcommerce/magento-product'
import { AddProductsToCartForm, ProductScroller } from '@graphcommerce/magento-product'
import { Trans } from '@lingui/macro'

export type CartItemCrosssellsProps = {
  renderer: ProductListItemRenderer
} & Omit<ProductScrollerProps, 'productListRenderer' | 'items'>

export function CartCrosssellsScroller(props: CartItemCrosssellsProps) {
  const { renderer, sx = [], title, titleProps } = props
  const [, crossSellItems] = useCrosssellItems()

  const crossSellsHideCartItems = Boolean(import.meta.graphCommerce.crossSellsHideCartItems)
  if (crossSellItems.length === 0 || crossSellsHideCartItems === true) return null

  return (
    <AddProductsToCartForm redirect={false} disableSuccessSnackbar>
      <ProductScroller
        productListRenderer={renderer}
        items={crossSellItems}
        sx={sx}
        title={title ?? <Trans>Complete your purchase</Trans>}
        titleProps={{ variant: 'h6', ...titleProps }}
      />
    </AddProductsToCartForm>
  )
}
