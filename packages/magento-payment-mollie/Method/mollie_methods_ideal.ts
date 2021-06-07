import { PaymentModule } from '@reachdigital/magento-cart-payment-method'
import MollieIdealOptions from '../MollieOptionsIssuer/MollieIdealOptions'
import MollieToggle from '../MolliePaymentToggle/MolliePaymentToggle'
import MolliePlaceOrder from '../MolliePlaceOrder/MolliePlaceOrder'

export const mollie_methods_ideal: PaymentModule = {
  PaymentToggle: MollieToggle,
  PaymentOptions: MollieIdealOptions,
  PaymentPlaceOrder: MolliePlaceOrder,
}
