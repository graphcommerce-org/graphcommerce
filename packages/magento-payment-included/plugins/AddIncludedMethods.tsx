import type { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { banktransfer, cashondelivery, checkmo, free } from '../methods'
import { purchaseorder } from '../PurchaseOrder'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-cart-payment-method',
}

export function PaymentMethodContextProvider(
  props: PluginProps<PaymentMethodContextProviderProps>,
) {
  const { Prev, modules, ...rest } = props
  return (
    <Prev
      {...rest}
      modules={{ ...modules, banktransfer, checkmo, free, cashondelivery, purchaseorder }}
    />
  )
}
