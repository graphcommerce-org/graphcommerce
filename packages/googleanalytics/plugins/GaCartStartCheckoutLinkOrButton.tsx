import { CartStartCheckoutLinkOrButtonProps } from '@graphcommerce/magento-cart'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { gtagBeginCheckout } from '../events/gtagBeginCheckout/gtagBeginCheckout'

export const component = 'CartStartCheckoutLinkOrButton'
export const exported = '@graphcommerce/magento-cart'
export const ifConfig: IfConfig = 'googleAnalyticsId'

export function GaCartStartCheckoutLinkOrButton(
  props: PluginProps<CartStartCheckoutLinkOrButtonProps>,
) {
  const { Prev, onStart, ...rest } = props
  return (
    <Prev
      {...rest}
      onStart={(e, cart) => {
        gtagBeginCheckout(cart)
        return onStart?.(e, cart)
      }}
    />
  )
}

export const Plugin = GaCartStartCheckoutLinkOrButton
