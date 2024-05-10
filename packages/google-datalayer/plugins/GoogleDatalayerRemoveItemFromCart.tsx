import type { RemoveItemFromCartProps } from '@graphcommerce/magento-cart-items'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { sendEvent } from '../api/sendEvent'
import { cartItemToRemoveFromCart } from '../mapping/cartItemToRemoveFromCart/cartToRemoveFromCart'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-cart-items',
}

export function RemoveItemFromCart(props: PluginProps<RemoveItemFromCartProps>) {
  const { Prev, buttonProps } = props

  return (
    <Prev
      {...props}
      buttonProps={{
        ...buttonProps,
        onClick: (e) => {
          sendEvent(
            'remove_from_cart',
            cartItemToRemoveFromCart({ __typename: 'SimpleCartItem', ...props }),
          )
          buttonProps?.onClick?.(e)
        },
      }}
    />
  )
}
