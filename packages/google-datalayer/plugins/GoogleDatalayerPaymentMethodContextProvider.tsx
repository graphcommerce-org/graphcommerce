import type { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { useSendEvent } from '../api/sendEvent'
import { cartToPurchase } from '../mapping/cartToPurchase/cartToPurchase'

export const config: PluginConfig = {
  module: '@graphcommerce/magento-cart-payment-method',
  type: 'component',
}

export function PaymentMethodContextProvider(
  props: PluginProps<PaymentMethodContextProviderProps>,
) {
  const { Prev, onSuccess, ...rest } = props

  const sendEvent = useSendEvent()
  return (
    <Prev
      {...rest}
      onSuccess={(orderNumber, cart) => {
        sendEvent('purchase', cartToPurchase(orderNumber, cart))
        return onSuccess?.(orderNumber, cart)
      }}
    />
  )
}
