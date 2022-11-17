import { PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { PayPalExpressActionCard } from './components/PayPalPaymentActionCard/PayPalPaymentActionCard'
import { PayPalPaymentHandler } from './components/PayPalPaymentHandler/PayPalPaymentHandler'
import { PayPalPaymentOptions } from './components/PayPalPaymentOptionsAndPlaceOrder/PayPalPaymentOptions'

export const paypal: Record<string, PaymentModule> = {
  paypal_express: {
    PaymentOptions: PayPalPaymentOptions,
    PaymentActionCard: PayPalExpressActionCard,
    PaymentHandler: PayPalPaymentHandler,
    PaymentPlaceOrder: () => null,
  },
}
