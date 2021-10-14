import { PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import MollieIdealOptions from '../components/MollieOptionsIssuer/MollieIdealOptions'
import MolliePaymentHandler from '../components/MolliePaymentHandler/MolliePaymentHandler'
import MollieToggle from '../components/MolliePaymentToggle/MolliePaymentToggle'
import MolliePlaceOrder from '../components/MolliePlaceOrder/MolliePlaceOrder'

export const mollie_methods_ideal: PaymentModule = {
  PaymentToggle: MollieToggle,
  PaymentOptions: MollieIdealOptions,
  PaymentPlaceOrder: MolliePlaceOrder,
  PaymentHandler: MolliePaymentHandler,
}
