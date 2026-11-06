import type { PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { PaymentMethodActionCard } from './PaymentMethodActionCard'
import { PaymentMethodOptions } from './PaymentMethodOptions'
import { PaymentMethodPlaceOrder } from './PaymentMethodPlaceOrder'

export const braintree: PaymentModule = {
  PaymentActionCard: PaymentMethodActionCard,
  PaymentOptions: PaymentMethodOptions,
  PaymentPlaceOrder: PaymentMethodPlaceOrder,
}
