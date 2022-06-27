import { PaymentMethodOptionsNoop, PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { MolliePaymentHandler } from '../components/MolliePaymentHandler/MolliePaymentHandler'
import { MolliePlaceOrder } from '../components/MolliePlaceOrder/MolliePlaceOrder'

export const mollie_methods_creditcard: PaymentModule = {
  PaymentOptions: PaymentMethodOptionsNoop,
  PaymentPlaceOrder: MolliePlaceOrder,
  PaymentHandler: MolliePaymentHandler,
}
