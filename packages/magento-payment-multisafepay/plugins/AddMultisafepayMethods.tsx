import { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { multisafepay } from '../methods'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-cart-payment-method',
}

export function PaymentMethodContextProvider(
  props: PluginProps<PaymentMethodContextProviderProps>,
) {
  const { modules, Prev, ...rest } = props
  return <Prev {...rest} modules={{ ...modules, ...multisafepay }} />
}
