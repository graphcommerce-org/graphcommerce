import type { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import type { PluginProps } from '@graphcommerce/next-config'
import { PayPalExpressActionCard } from '../components/PayPalPaymentActionCard/PayPalPaymentActionCard'
import { PayPalPaymentHandler } from '../components/PayPalPaymentHandler/PayPalPaymentHandler'
import { PayPalPaymentOptions } from '../components/PayPalPaymentOptionsAndPlaceOrder/PayPalPaymentOptions'

export const component = 'PaymentMethodContextProvider'
export const exported = '@graphcommerce/magento-cart-payment-method'

const paypal_express = {
  PaymentOptions: PayPalPaymentOptions,
  PaymentActionCard: PayPalExpressActionCard,
  PaymentHandler: PayPalPaymentHandler,
  PaymentPlaceOrder: () => null,
}

function AddPaypalMethods(props: PluginProps<PaymentMethodContextProviderProps>) {
  const { modules, Component } = props
  return <Component {...props} modules={{ ...modules, paypal_express }} />
}

export const Plugin = AddPaypalMethods
