import { CartStartCheckoutLinkOrButtonProps } from '@graphcommerce/magento-cart'
import { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useMemoObject } from '@graphcommerce/next-ui'
import { useEffect } from 'react'
import { dataLayerViewCart } from '../events/dataLayerViewCart/dataLayerViewCart'
import { dataLayerBeginCheckout } from '../events/dataLayerBeginCheckout/dataLayerBeginCheckout'

export const component = 'CartStartCheckoutLinkOrButton'
export const exported = '@graphcommerce/magento-cart'
export const ifConfig: IfConfig = 'googleTagmanagerId'

export function GtmCartStartCheckoutLinkOrButton(
  props: PluginProps<CartStartCheckoutLinkOrButtonProps>,
) {
  const { Prev, onStart, ...rest } = props

  const cartObject = useMemoObject({ items: rest.items, prices: rest.prices })

  useEffect(() => {
    if (cartObject.items) {
      dataLayerViewCart(cartObject)
    }
  }, [cartObject])

  return (
    <Prev
      {...rest}
      onStart={(e, cart) => {
        dataLayerBeginCheckout(cart)
        return onStart?.(e, cart)
      }}
    />
  )
}

export const Plugin = GtmCartStartCheckoutLinkOrButton
