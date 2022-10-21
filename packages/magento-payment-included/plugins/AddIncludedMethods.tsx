import type { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import { purchaseorder } from '../PurchaseOrder'
import { banktransfer, checkmo, free, cashondelivery } from '../methods'

export const component = 'PaymentMethodContextProvider'
export const exported =
  '@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext'

export const plugin = (PaymentMethodContextProvider: React.FC<PaymentMethodContextProviderProps>) =>
  function AddIncludedMethods(props: React.ComponentProps<typeof PaymentMethodContextProvider>) {
    const { modules } = props
    return (
      <PaymentMethodContextProvider
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
