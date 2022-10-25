/* eslint-disable import/no-mutable-exports */
import type { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext'
import type { PluginProps } from '@graphcommerce/next-config'
import * as methods from '../methods'

export const component = 'PaymentMethodContextProvider'
export const exported =
  '@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext'

function AddMollieMethods(props: PluginProps<PaymentMethodContextProviderProps>) {
  const { modules, Component } = props
  return <Component {...props} modules={{ ...modules, ...methods }} />
}
// eslint-disable-next-line prefer-const
export let Plugin = AddMollieMethods
