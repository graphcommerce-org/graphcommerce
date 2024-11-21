import type { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import { PaymentMethodOptionsNoop } from '@graphcommerce/magento-cart-payment-method'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { PayPalExpressActionCard } from '../components/PayPalPaymentActionCard/PayPalPaymentActionCard'
import { PayPalPaymentHandler } from '../components/PayPalPaymentHandler/PayPalPaymentHandler'
import { PayPalPaymentPlaceOrder } from '../components/PayPalPaymentPlaceOrder/PayPalPaymentPlaceOrder'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-cart-payment-method',
}

const paypal_express = {
  PaymentOptions: PaymentMethodOptionsNoop,
  PaymentActionCard: PayPalExpressActionCard,
  PaymentHandler: PayPalPaymentHandler,
  PaymentPlaceOrder: PayPalPaymentPlaceOrder,
}

export function PaymentMethodContextProvider(
  props: PluginProps<PaymentMethodContextProviderProps>,
) {
  const { modules, Prev, ...rest } = props
  return <Prev {...rest} modules={{ ...modules, paypal_express }} />
}
