import type { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import type { PluginProps } from '@graphcommerce/next-config'
import { purchase } from '../events/purchase'

export const component = 'PaymentMethodContextProvider'
export const exported = '@graphcommerce/magento-cart-payment-method'

function GoogleDatalayerPaymentMethodContextProvider(
  props: PluginProps<PaymentMethodContextProviderProps>,
) {
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
export const Plugin = GoogleDatalayerPaymentMethodContextProvider
