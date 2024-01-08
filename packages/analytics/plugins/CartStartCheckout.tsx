import { CartStartCheckoutProps } from '@graphcommerce/magento-cart'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { beginCheckout } from '../events/begin_checkout'

export const component = 'CartStartCheckout'
export const exported = '@graphcommerce/magento-cart'
export const ifConfig: IfConfig = 'googleAnalyticsId'

export function CartStartCheckout(props: PluginProps<CartStartCheckoutProps>) {
  const { Prev, onStart, ...rest } = props
  return (
    <Prev
      {...rest}
      onStart={(e, cart) => {
        beginCheckout(cart)
        return onStart?.(e, cart)
      }}
    />
  )
}

export const Plugin = CartStartCheckout
