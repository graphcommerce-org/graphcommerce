import {
  PaymentMethodContextProviderProps,
} from '@graphcommerce/magento-cart-payment-method'
import type { PluginProps } from '@graphcommerce/next-config'
import { adyen_cc } from '../methods/adyen_cc'
import { adyen_hpp } from '../methods/adyen_hpp'
import { adyen_redirect } from '../methods/adyen_redirect'

export const component = 'PaymentMethodContextProvider'
export const exported = '@graphcommerce/magento-cart-payment-method'

function AddAdyenMethods(props: PluginProps<PaymentMethodContextProviderProps>) {
  const { modules, Prev, ...rest } = props
  return <Prev {...rest} modules={{ ...modules, adyen_cc, adyen_hpp, adyen_redirect }} />
}

export const Plugin = AddAdyenMethods
