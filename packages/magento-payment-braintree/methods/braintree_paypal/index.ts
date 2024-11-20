import type { PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { PaymentMethodPlaceOrderNoop } from '@graphcommerce/magento-cart-payment-method'
import { PaymentMethodOptions } from './PaymentMethodOptions'

export const braintree_paypal: PaymentModule = {
  PaymentOptions: PaymentMethodOptions,
  PaymentPlaceOrder: PaymentMethodPlaceOrderNoop,
}
