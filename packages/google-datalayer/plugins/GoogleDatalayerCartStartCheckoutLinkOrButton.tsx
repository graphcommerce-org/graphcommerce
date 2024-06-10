import { CartStartCheckoutLinkOrButtonProps } from '@graphcommerce/magento-cart'
import type { PluginProps } from '@graphcommerce/next-config'
import { sendEvent } from '../api/sendEvent'
import { cartToBeginCheckout } from '../mapping/cartToBeginCheckout/cartToBeginCheckout'

export const component = 'CartStartCheckoutLinkOrButton'
export const exported = '@graphcommerce/magento-cart'

export function GoogleDatalayerCartStartCheckoutLinkOrButton(
  props: PluginProps<CartStartCheckoutLinkOrButtonProps>,
) {
  const { Prev, onStart, ...rest } = props

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

export const Plugin = GoogleDatalayerCartStartCheckoutLinkOrButton
