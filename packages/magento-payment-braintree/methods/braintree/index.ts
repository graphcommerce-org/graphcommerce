import {
  PaymentMethodPlaceOrderNoop,
  PaymentModule,
} from '@reachdigital/magento-cart-payment-method'
import PaymentMethodOptions from './PaymentMethodOptions'

export const braintree = {
  PaymentOptions: PaymentMethodOptions,
  PaymentPlaceOrder: PaymentMethodPlaceOrderNoop,
} as PaymentModule
