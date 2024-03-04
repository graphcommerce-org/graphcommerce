import {
  PaymentMethodPlaceOrderNoop,
  PaymentModule,
} from '@graphcommerce/magento-cart-payment-method'
import { PaymentHandler } from './PaymentHandler'
import { PaymentMethodOptions } from './PaymentMethodOptions'
import { expandMethods } from './expandMethods'

export const braintree_local_payment: PaymentModule = {
  PaymentOptions: PaymentMethodOptions,
  PaymentPlaceOrder: PaymentMethodPlaceOrderNoop,
  PaymentHandler,
  expandMethods,
}
