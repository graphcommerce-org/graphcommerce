import type { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import type { PluginProps } from '@graphcommerce/next-config'
import { purchaseorder } from '../PurchaseOrder'
import { banktransfer, checkmo, free, cashondelivery } from '../methods'

export const component = 'PaymentMethodContextProvider'
export const exported = '@graphcommerce/magento-cart-payment-method'

function AddIncludedMethods(props: PluginProps<PaymentMethodContextProviderProps>) {
  const { Prev, modules, ...rest } = props
  return (
    <Prev
      {...rest}
      modules={{ ...modules, banktransfer, checkmo, free, cashondelivery, purchaseorder }}
    />
  )
}

export const Plugin = AddIncludedMethods
