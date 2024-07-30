import type { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { sendEvent } from '../api/sendEvent'
import { orderToPurchase } from '../mapping/orderToPurchase/orderToPurchase'

export const config: PluginConfig = {
  module: '@graphcommerce/magento-cart-payment-method',
  type: 'component',
}

export function PaymentMethodContextProvider(
  props: PluginProps<PaymentMethodContextProviderProps>,
) {
  const { Prev, onSuccess, ...rest } = props
  return (
    <Prev
      {...rest}
      onSuccess={(orderNumber, cart) => {
        sendEvent('purchase', orderToPurchase(orderNumber, cart))
        return onSuccess?.(orderNumber, cart)
      }}
    />
  )
}
