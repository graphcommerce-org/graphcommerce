import { CartStartCheckoutProps } from '@graphcommerce/magento-cart'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { useMemoObject } from '@graphcommerce/next-ui'
import { useEffect, useRef } from 'react'
import { useSendEvent } from '../api/sendEvent'
import { cartToBeginCheckout } from '../mapping/cartToBeginCheckout/cartToBeginCheckout'
import { cartToViewCart } from '../mapping/cartToViewCart/cartToViewCart'

export const config: PluginConfig = {
  module: '@graphcommerce/magento-cart',
  type: 'component',
}

export function CartStartCheckout(props: PluginProps<CartStartCheckoutProps>) {
  const { Prev, onStart, ...rest } = props

  const send = useRef(false)
  const sendEvent = useSendEvent()
  const viewCart = useMemoObject(cartToViewCart({ __typename: 'Cart', ...props }))
  useEffect(() => {
    if (!send.current) {
      sendEvent('view_cart', viewCart)
      send.current = true
    }
  }, [viewCart])

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
