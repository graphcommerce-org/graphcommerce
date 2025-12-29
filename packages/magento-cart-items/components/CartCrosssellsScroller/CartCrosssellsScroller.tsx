import { useCrosssellItems } from '@graphcommerce/magento-cart/components/CartAdded/useCrosssellItems'
import type { ProductListItemRenderer, ProductScrollerProps } from '@graphcommerce/magento-product'
import { AddProductsToCartForm, ProductScroller } from '@graphcommerce/magento-product'
import { crossSellsHideCartItems } from '@graphcommerce/next-config/config'
import { Trans } from '@lingui/react/macro'

export type CartItemCrosssellsProps = {
  renderer: ProductListItemRenderer
} & Omit<ProductScrollerProps, 'productListRenderer' | 'items'>

export function CartCrosssellsScroller(props: CartItemCrosssellsProps) {
  const { renderer, sx = [], title, titleProps } = props
  const [, crossSellItems] = useCrosssellItems()

  const hideCartItems = Boolean(crossSellsHideCartItems)
  if (crossSellItems.length === 0 || hideCartItems === true) return null

  return (
    <AddProductsToCartForm redirect={false} snackbarProps={{ disableSuccessSnackbar: true }}>
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
