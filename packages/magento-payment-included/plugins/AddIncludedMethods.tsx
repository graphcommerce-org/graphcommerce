import type { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import type { Plugin } from '@graphcommerce/next-config'
import { purchaseorder } from '../PurchaseOrder'
import { banktransfer, checkmo, free, cashondelivery } from '../methods'

export const component = 'PaymentMethodContextProvider'
export const exported =
  '@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext'

export const plugin: Plugin<PaymentMethodContextProviderProps> = ({ Component }) =>
  function AddIncludedMethods(props) {
    const { modules } = props
    return (
      <Component
        {...props}
        modules={{
          ...modules,
          banktransfer,
          checkmo,
          free,
          cashondelivery,
          purchaseorder,
        }}
      />
    )
  }
