import {
  PaymentMethodPlaceOrderNoop,
  PaymentModule,
} from '@graphcommerce/magento-cart-payment-method'
import { PaymentMethodOptions } from './PaymentMethodOptions'

export const braintree: PaymentModule = {
  PaymentOptions: PaymentMethodOptions,
  PaymentPlaceOrder: PaymentMethodPlaceOrderNoop,
}
