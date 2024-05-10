import type { RemoveItemFromCartFabProps } from '@graphcommerce/magento-cart-items'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { sendEvent } from '../api/sendEvent'
import { cartItemToRemoveFromCart } from '../mapping/cartItemToRemoveFromCart/cartToRemoveFromCart'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-cart-items',
}

export function RemoveItemFromCartFab(props: PluginProps<RemoveItemFromCartFabProps>) {
  const { Prev, fabProps } = props

  return (
    <Prev
      {...props}
      fabProps={{
        ...fabProps,
        onClick: (e) => {
          sendEvent(
            'remove_from_cart',
            cartItemToRemoveFromCart({ __typename: 'SimpleCartItem', ...props }),
          )
          fabProps?.onClick?.(e)
        },
      }}
    />
  )
}
