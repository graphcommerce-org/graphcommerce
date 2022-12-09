import type { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import type { PluginProps } from '@graphcommerce/next-config'
import { gtagAddPurchaseInfo } from '../events/gtagAddPurchaseInfo/gtagAddPurchaseInfo'

export const component = 'PaymentMethodContextProvider'
export const exported = '@graphcommerce/magento-cart-payment-method'

function GaPaymentMethodContextProvider(props: PluginProps<PaymentMethodContextProviderProps>) {
  const { Prev, onSuccess, ...rest } = props
  return (
    <Prev
      {...rest}
      onSuccess={(orderNumber, cart) => {
        gtagAddPurchaseInfo(orderNumber, cart)
        return onSuccess?.(orderNumber, cart)
      }}
    />
  )
}
export const Plugin = GaPaymentMethodContextProvider
