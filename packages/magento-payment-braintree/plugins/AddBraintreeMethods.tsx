import type { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import { braintree } from '../methods/braintree'
import { braintree_local_payment } from '../methods/braintree_local_payments'

export const plugin = (PaymentMethodContextProvider: React.FC<PaymentMethodContextProviderProps>) =>
  function AddBraintreeMethods(props: React.ComponentProps<typeof PaymentMethodContextProvider>) {
    const { modules } = props
    return (
      <PaymentMethodContextProvider
        {...props}
        modules={{
          ...modules,
          braintree,
          braintree_local_payment,
        }}
      />
    )
  }
