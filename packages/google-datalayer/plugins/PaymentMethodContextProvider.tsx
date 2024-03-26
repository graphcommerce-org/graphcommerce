import type { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { purchase } from '../events/purchase'

export const component = 'PaymentMethodContextProvider'
export const exported = '@graphcommerce/magento-cart-payment-method'
export const ifConfig: IfConfig = 'analytics'

function PaymentMethodContextProvider(props: PluginProps<PaymentMethodContextProviderProps>) {
  const { Prev, onSuccess, ...rest } = props
  return (
    <Prev
      {...rest}
      onSuccess={(orderNumber, cart) => {
        purchase(orderNumber, cart)
        return onSuccess?.(orderNumber, cart)
      }}
    />
  )
}
export const Plugin = PaymentMethodContextProvider
