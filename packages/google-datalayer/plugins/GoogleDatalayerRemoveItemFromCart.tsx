import type { useRemoveItemFromCart as useRemoveItemFromCartBase } from '@graphcommerce/magento-cart-items'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { sendEvent } from '../api/sendEvent'
import { cartItemToRemoveFromCart } from '../mapping/cartItemToRemoveFromCart/cartToRemoveFromCart'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/magento-cart-items',
}

export const useRemoveItemFromCart: FunctionPlugin<typeof useRemoveItemFromCartBase> = (
  usePrev,
  props,
) =>
  usePrev({
    ...props,
    onComplete: (result, variables) => {
      if (!result.errors) {
        sendEvent(
          'remove_from_cart',
          cartItemToRemoveFromCart({ __typename: 'SimpleCartItem', ...props }),
        )
      }
      return props.onComplete?.(result, variables)
    },
  })
