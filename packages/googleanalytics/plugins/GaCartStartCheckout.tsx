import { CartStartCheckoutProps } from '@graphcommerce/magento-cart'
import { PluginProps } from '@graphcommerce/next-config'
import { gtagBeginCheckout } from '../events/gtagBeginCheckout/gtagBeginCheckout'

export const component = 'CartStartCheckout'
export const exported = '@graphcommerce/magento-cart'

export function GaCartStartCheckout(props: PluginProps<CartStartCheckoutProps>) {
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

export const Plugin = GaCartStartCheckout
