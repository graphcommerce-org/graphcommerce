import {
  PaymentMethodContextProviderProps,
  PaymentMethodOptionsNoop,
} from '@graphcommerce/magento-cart-payment-method'
import type { PluginProps } from '@graphcommerce/next-config'
import { PayPalPaymentPlaceOrder } from '../components/PayPalPaymentPlaceOrder/PayPalPaymentPlaceOrder'
import { PayPalExpressActionCard } from '../components/PayPalPaymentActionCard/PayPalPaymentActionCard'
import { PayPalPaymentHandler } from '../components/PayPalPaymentHandler/PayPalPaymentHandler'

export const component = 'PaymentMethodContextProvider'
export const exported = '@graphcommerce/magento-cart-payment-method'

const paypal_express = {
  PaymentOptions: PaymentMethodOptionsNoop,
  PaymentActionCard: PayPalExpressActionCard,
  PaymentHandler: PayPalPaymentHandler,
  PaymentPlaceOrder: PayPalPaymentPlaceOrder,
}

function AddPaypalMethods(props: PluginProps<PaymentMethodContextProviderProps>) {
  const { modules, Prev, ...rest } = props
  return <Prev {...rest} modules={{ ...modules, paypal_express }} />
}

export const Plugin = AddPaypalMethods
