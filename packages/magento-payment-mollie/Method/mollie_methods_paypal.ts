import { PaymentMethodOptionsNoop, PaymentModule } from '@reachdigital/magento-cart-payment-method'
import MollieToggle from '../MolliePaymentToggle/MolliePaymentToggle'
import MolliePlaceOrder from '../MolliePlaceOrder/MolliePlaceOrder'

export const mollie_methods_paypal: PaymentModule = {
  PaymentToggle: MollieToggle,
  PaymentOptions: PaymentMethodOptionsNoop,
  PaymentPlaceOrder: MolliePlaceOrder,
}
