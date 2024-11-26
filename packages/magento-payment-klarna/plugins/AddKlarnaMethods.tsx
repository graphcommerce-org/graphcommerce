import { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import type { PluginProps } from '@graphcommerce/next-config'

import { klarna } from '../methods'

export const component = 'PaymentMethodContextProvider'
export const exported = '@graphcommerce/magento-cart-payment-method'

function AddKlarnaMethods(props: PluginProps<PaymentMethodContextProviderProps>) {
  const { modules, Prev, ...rest } = props
  return <Prev {...rest} modules={{ ...modules, ...klarna }} />
}

export const Plugin = AddKlarnaMethods
