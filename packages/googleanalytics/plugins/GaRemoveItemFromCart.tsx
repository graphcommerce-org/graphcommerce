import type { RemoveItemFromCartProps } from '@graphcommerce/magento-cart-items'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { gtagRemoveFromCart } from '../events/gtagRemoveFromCart/gtagRemoveFromCart'

export const component = 'RemoveItemFromCart'
export const exported =
  '@graphcommerce/magento-cart-items/components/RemoveItemFromCart/RemoveItemFromCart'
export const ifConfig: IfConfig = 'googleAnalyticsId'

export const GaRemoveItemFromCart = (props: PluginProps<RemoveItemFromCartProps>) => {
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
