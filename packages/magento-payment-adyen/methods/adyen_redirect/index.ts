import { PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { AdyenPaymentActionCard } from '../../components/AdyenPaymentActionCard/AdyenPaymentActionCard'
import { AdyenPaymentHandler } from '../../components/AdyenPaymentHandler/AdyenPaymentHandler'
import { HppOptions } from '../../components/AdyenPaymentOptionsAndPlaceOrder/AdyenPaymentOptionsAndPlaceOrder'
import { adyenRedirectExpandMethods } from './adyenRedirectExpandMethods'

export const adyen_redirect: PaymentModule = {
  PaymentOptions: HppOptions,
  PaymentPlaceOrder: () => null,
  PaymentHandler: AdyenPaymentHandler,
  PaymentActionCard: AdyenPaymentActionCard,
  expandMethods: adyenRedirectExpandMethods,
}
