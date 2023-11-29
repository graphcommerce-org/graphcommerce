import { PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { PaymentMethodOptions } from './PaymentMethodOptions'
import { AdyenPaymentActionCard } from '../../components/AdyenPaymentActionCard/AdyenPaymentActionCard'
import { adyenCcExpandMethods } from '../../hooks/adyenCcExpandMethods'
import { PaymentButton } from './PaymentButton'

export const adyen_cc = {
  PaymentOptions: PaymentMethodOptions,
  PaymentPlaceOrder: () => null,
  PaymentActionCard: AdyenPaymentActionCard,
  expandMethods: adyenCcExpandMethods,
  PaymentButton: PaymentButton,
} as PaymentModule
