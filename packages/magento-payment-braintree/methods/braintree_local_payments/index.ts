import type { PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { PaymentMethodPlaceOrderNoop } from '@graphcommerce/magento-cart-payment-method'
import { expandMethods } from './expandMethods'
import { PaymentHandler } from './PaymentHandler'
import { PaymentMethodOptions } from './PaymentMethodOptions'

export const braintree_local_payment: PaymentModule = {
  PaymentOptions: PaymentMethodOptions,
  PaymentPlaceOrder: PaymentMethodPlaceOrderNoop,
  PaymentHandler,
  expandMethods,
}
