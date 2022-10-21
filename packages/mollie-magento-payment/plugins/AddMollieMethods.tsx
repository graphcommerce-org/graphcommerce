import type { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
// import type { Plugin } from '@graphcommerce/plugin'
import { mollie_methods_creditcard } from '../methods/mollie_methods_creditcard'
import { mollie_methods_ideal } from '../methods/mollie_methods_ideal'
import { mollie_methods_klarnapaylater } from '../methods/mollie_methods_klarnapaylater'
import { mollie_methods_paypal } from '../methods/mollie_methods_paypal'

export const component = 'PaymentMethodContextProvider'
export const exported =
  '@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext'

export const plugin = (Subject: React.FC<PaymentMethodContextProviderProps>) =>
  function AddMollieMethods(props: React.ComponentProps<typeof Subject>) {
    const { modules } = props

    return (
      <Subject
        {...props}
        modules={{
          ...modules,
          mollie_methods_creditcard,
          mollie_methods_ideal,
          mollie_methods_klarnapaylater,
          mollie_methods_paypal,
        }}
      />
    )
  }
