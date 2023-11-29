import { PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { PaymentMethodOptions } from './PaymentMethodOptions'
import { PaymentButton } from './PaymentButton'
import { AdyenPaymentActionCard } from '../../components/AdyenPaymentActionCard/AdyenPaymentActionCard'
import { AdyenPaymentHandler } from '../../components/AdyenPaymentHandler/AdyenPaymentHandler'
import { adyenHppExpandMethods } from '../../hooks/adyenHppExpandMethods'

export const adyen_hpp = {
  PaymentOptions: PaymentMethodOptions,
  PaymentPlaceOrder: () => null,
  PaymentActionCard: AdyenPaymentActionCard,
  PaymentHandler: AdyenPaymentHandler,
  PaymentButton: PaymentButton,
  expandMethods: adyenHppExpandMethods,
} as PaymentModule
