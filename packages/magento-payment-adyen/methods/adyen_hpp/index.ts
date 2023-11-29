import { PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { AdyenPaymentActionCard } from '../../components/AdyenPaymentActionCard/AdyenPaymentActionCard'
import { AdyenPaymentHandler } from '../../components/AdyenPaymentHandler/AdyenPaymentHandler'
import { PaymentButton } from './PaymentButton'
import { PaymentMethodOptions } from './PaymentMethodOptions'
import { adyenHppExpandMethods } from './adyenHppExpandMethods'

export const adyen_hpp = {
  PaymentOptions: PaymentMethodOptions,
  PaymentPlaceOrder: () => null,
  PaymentActionCard: AdyenPaymentActionCard,
  PaymentHandler: AdyenPaymentHandler,
  PaymentButton,
  expandMethods: adyenHppExpandMethods,
} as PaymentModule
