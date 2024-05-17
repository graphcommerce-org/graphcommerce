import type { PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { PaymentMethodPlaceOrderNoop } from '@graphcommerce/magento-cart-payment-method/PaymentMethodPlaceOrderNoop/PaymentMethodPlaceOrderNoop'
import { PaymentMethodOptions } from './PaymentMethodOptions'

export const braintree: PaymentModule = {
  PaymentOptions: PaymentMethodOptions,
  PaymentPlaceOrder: PaymentMethodPlaceOrderNoop,
}
