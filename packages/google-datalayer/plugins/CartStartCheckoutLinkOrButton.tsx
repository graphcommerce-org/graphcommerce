import { CartStartCheckoutLinkOrButtonProps } from '@graphcommerce/magento-cart'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useMemoObject } from '@graphcommerce/next-ui'
import { useEffect } from 'react'
import { beginCheckout } from '../events/begin_checkout'
import { viewCart } from '../events/view_cart'

export const component = 'CartStartCheckoutLinkOrButton'
export const exported = '@graphcommerce/magento-cart'
export const ifConfig: IfConfig = 'analytics'

export function CartStartCheckoutLinkOrButton(
  props: PluginProps<CartStartCheckoutLinkOrButtonProps>,
) {
  const { Prev, onStart, ...rest } = props

  const cartObject = useMemoObject({ items: rest.items, prices: rest.prices })

  useEffect(() => {
    if (cartObject.items) {
      viewCart(cartObject)
    }
  }, [cartObject])

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

export const Plugin = CartStartCheckoutLinkOrButton
