import { PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { AdyenPaymentActionCard } from './components/AdyenPaymentActionCard/AdyenPaymentActionCard'
import { AdyenPaymentHandler } from './components/AdyenPaymentHandler/AdyenPaymentHandler'
import { HppOptions } from './components/AdyenPaymentOptionsAndPlaceOrder/AdyenPaymentOptionsAndPlaceOrder'
import { adyenHppExpandMethods } from './methods/adyen_hpp/adyenHppExpandMethods'

export const adyen_hpp: PaymentModule = {
  PaymentOptions: HppOptions,
  PaymentPlaceOrder: () => null,
  PaymentHandler: AdyenPaymentHandler,
  PaymentActionCard: AdyenPaymentActionCard,
  expandMethods: adyenHppExpandMethods,
}
