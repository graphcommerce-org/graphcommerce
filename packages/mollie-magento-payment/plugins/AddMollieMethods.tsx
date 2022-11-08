import type { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import type { PluginProps } from '@graphcommerce/next-config'
import * as methods from '../methods'

export const component = 'PaymentMethodContextProvider'
export const exported = '@graphcommerce/magento-cart-payment-method'

function AddMollieMethods(props: PluginProps<PaymentMethodContextProviderProps>) {
  const { modules, Prev } = props
  return <Prev {...props} modules={{ ...modules, ...methods }} />
}
export const Plugin = AddMollieMethods
