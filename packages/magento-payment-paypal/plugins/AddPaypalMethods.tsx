import type { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import type { Plugin } from '@graphcommerce/next-config'
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

export const plugin: Plugin<PaymentMethodContextProviderProps> = ({ Component }) =>
  function AddPaypalMethods(props) {
    const { modules } = props
    return <Component {...props} modules={{ ...modules, paypal_express }} />
  }
