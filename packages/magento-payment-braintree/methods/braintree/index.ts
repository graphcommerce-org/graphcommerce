import {
  PaymentMethodPlaceOrderNoop,
  PaymentModule,
} from '@graphcommerce/magento-cart-payment-method'
import { PaymentMethodOptions } from './PaymentMethodOptions'

export const braintree = {
  PaymentOptions: PaymentMethodOptions,
  PaymentPlaceOrder: PaymentMethodPlaceOrderNoop,
} as PaymentModule
