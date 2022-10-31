import { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import type { PluginProps } from '@graphcommerce/next-config'
import { multisafepay } from '../methods'

export const component = 'PaymentMethodContextProvider'
export const exported = '@graphcommerce/magento-cart-payment-method'

function AddMultisafepayMethods(props: PluginProps<PaymentMethodContextProviderProps>) {
  const { modules, Prev } = props
  return <Prev {...props} modules={{ ...modules, ...multisafepay }} />
}

export const Plugin = AddMultisafepayMethods
