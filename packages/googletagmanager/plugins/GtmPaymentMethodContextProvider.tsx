import type { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { dataLayerAddPurchaseInfo } from '../events/dataLayerAddPurchaseInfo/dataLayerAddPurchaseInfo'

export const component = 'PaymentMethodContextProvider'
export const exported = '@graphcommerce/magento-cart-payment-method'
export const ifConfig: IfConfig = 'googleTagmanagerId'

function GaPaymentMethodContextProvider(props: PluginProps<PaymentMethodContextProviderProps>) {
  const { Prev, onSuccess, ...rest } = props
  return (
    <Prev
      {...rest}
      onSuccess={(orderNumber, cart) => {
        dataLayerAddPurchaseInfo(orderNumber, cart)
        return onSuccess?.(orderNumber, cart)
      }}
    />
  )
}
export const Plugin = GaPaymentMethodContextProvider
