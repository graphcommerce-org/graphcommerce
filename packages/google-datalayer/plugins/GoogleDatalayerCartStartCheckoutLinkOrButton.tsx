import type { CartStartCheckoutLinkOrButtonProps } from '@graphcommerce/magento-cart'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { useSendEvent } from '../api/sendEvent'
import { cartToBeginCheckout } from '../mapping/cartToBeginCheckout/cartToBeginCheckout'

export const config: PluginConfig = {
  module: '@graphcommerce/magento-cart',
  type: 'component',
}

export function CartStartCheckoutLinkOrButton(
  props: PluginProps<CartStartCheckoutLinkOrButtonProps>,
) {
  const { Prev, onStart, ...rest } = props

  const sendEvent = useSendEvent()
  return (
    <Prev
      {...rest}
      onStart={(e, cart) => {
        if (cart) sendEvent('begin_checkout', cartToBeginCheckout(cart))
        return onStart?.(e, cart)
      }}
    />
  )
}
