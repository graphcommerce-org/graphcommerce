import {
  PaymentMethodPlaceOrderNoop,
  PaymentModule,
} from '@graphcommerce/magento-cart-payment-method'
import PaymentMethodOptions from './PaymentMethodOptions'
import { expandMethods } from './expandMethods'

export const braintree_local_payment = {
  PaymentOptions: PaymentMethodOptions,
  PaymentPlaceOrder: PaymentMethodPlaceOrderNoop,
  expandMethods,
} as PaymentModule
