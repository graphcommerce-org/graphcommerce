import type { RemoveItemFromCart } from '@graphcommerce/magento-cart-items'
import { IfConfig, ReactPlugin } from '@graphcommerce/next-config'
import { gtagRemoveFromCart } from '../events/gtagRemoveFromCart/gtagRemoveFromCart'

export const component = 'RemoveItemFromCartFab'
export const exported = '@graphcommerce/magento-cart-items/RemoveItemFromCart/RemoveItemFromCartFab'
export const ifConfig: IfConfig = 'googleAnalyticsId'

export const GaRemoveItemFromCart: ReactPlugin<typeof RemoveItemFromCart> = (props) => {
  const { Prev, uid, quantity, prices, product, buttonProps } = props

  return (
    <Prev
      {...props}
      product={product}
      buttonProps={{
        onClick: (e) => {
          gtagRemoveFromCart({
            __typename: 'Cart',
            items: [{ uid, __typename: 'SimpleCartItem', product, quantity, prices }],
          })
          buttonProps?.onClick?.(e)
        },
      }}
    />
  )
}

export const Plugin = GaRemoveItemFromCart
