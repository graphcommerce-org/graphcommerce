import type { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import { PayPalExpressActionCard } from '../components/PayPalPaymentActionCard/PayPalPaymentActionCard'
import { PayPalPaymentHandler } from '../components/PayPalPaymentHandler/PayPalPaymentHandler'
import { PayPalPaymentOptions } from '../components/PayPalPaymentOptionsAndPlaceOrder/PayPalPaymentOptions'

export const component = 'PaymentMethodContextProvider'
export const exported =
  '@graphcommerce/magento-cart-payment-method/PaymentMethodContext/PaymentMethodContext'

const paypal_express = {
  PaymentOptions: PayPalPaymentOptions,
  PaymentActionCard: PayPalExpressActionCard,
  PaymentHandler: PayPalPaymentHandler,
  PaymentPlaceOrder: () => null,
}

export const plugin = (PaymentMethodContextProvider: React.FC<PaymentMethodContextProviderProps>) =>
  function AddPaypalMethods(props: React.ComponentProps<typeof PaymentMethodContextProvider>) {
    const { modules } = props
    return <PaymentMethodContextProvider {...props} modules={{ ...modules, paypal_express }} />
  }
