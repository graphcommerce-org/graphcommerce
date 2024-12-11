import type { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { braintree } from '../methods/braintree'
import { braintree_local_payment } from '../methods/braintree_local_payments'
import { braintree_paypal } from '../methods/braintree_paypal'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-cart-payment-method',
}

export function PaymentMethodContextProvider(
  props: PluginProps<PaymentMethodContextProviderProps>,
) {
  const { modules, Prev, ...rest } = props
  return (
    <Prev
      {...rest}
      modules={{
        ...modules,
        braintree,
        braintree_local_payment,
        // braintree_paypal,
      }}
    />
  )
}
