import { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import type { PluginProps } from '@graphcommerce/next-config'
import { braintree } from '../methods/braintree'
import { braintree_local_payment } from '../methods/braintree_local_payments'

export const component = 'PaymentMethodContextProvider'
export const exported = '@graphcommerce/magento-cart-payment-method'

function AddBrainTreeMethods(props: PluginProps<PaymentMethodContextProviderProps>) {
  const { modules, Prev, ...rest } = props
  return <Prev {...rest} modules={{ ...modules, braintree, braintree_local_payment }} />
}

export const Plugin = AddBrainTreeMethods
