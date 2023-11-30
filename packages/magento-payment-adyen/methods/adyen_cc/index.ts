import { PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { AdyenPaymentActionCard } from '../../components/AdyenPaymentActionCard/AdyenPaymentActionCard'
import { PaymentButton } from './PaymentButton'
import { PaymentMethodOptions } from './PaymentMethodOptions'
import { adyenCcExpandMethods } from './adyenCcExpandMethods'

export const adyen_cc = {
  PaymentOptions: PaymentMethodOptions,
  PaymentPlaceOrder: () => null,
  PaymentActionCard: AdyenPaymentActionCard,
  expandMethods: adyenCcExpandMethods,
  PaymentButton,
} as PaymentModule
