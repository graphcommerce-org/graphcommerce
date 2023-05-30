import { CartStartCheckoutLinkOrButtonProps } from '@graphcommerce/magento-cart'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useMemoObject } from '@graphcommerce/next-ui'
import { useEffect } from 'react'
import { gtagBeginCheckout } from '../events/gtagBeginCheckout/gtagBeginCheckout'
import { gtagViewCart } from '../events/gtagViewCart/gtagViewCart'

export const component = 'CartStartCheckoutLinkOrButton'
export const exported = '@graphcommerce/magento-cart'
export const ifConfig: IfConfig = 'googleAnalyticsId'

export function GaCartStartCheckoutLinkOrButton(
  props: PluginProps<CartStartCheckoutLinkOrButtonProps>,
) {
  const { Prev, onStart, ...rest } = props

  const cartObject = useMemoObject({ items: rest.items, prices: rest.prices })

  useEffect(() => {
    if (cartObject.items) {
      gtagViewCart(cartObject)
    }
  }, [cartObject])

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
