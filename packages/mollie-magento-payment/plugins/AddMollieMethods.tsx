import type { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import { molliepayments } from '@graphcommerce/mollie-magento-payment/methods'
import type { PluginProps } from '@graphcommerce/next-config'

export const component = 'PaymentMethodContextProvider'
export const exported = '@graphcommerce/magento-cart-payment-method'

function AddMollieMethods(props: PluginProps<PaymentMethodContextProviderProps>) {
  const { modules, Prev, ...rest } = props
  return <Prev {...rest} modules={{ ...modules, ...molliepayments }} />
}
export const Plugin = AddMollieMethods
