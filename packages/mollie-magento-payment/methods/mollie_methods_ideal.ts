import { PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { MollieIdealOptions } from '../components/MollieOptionsIssuer/MollieIdealOptions'
import { MolliePaymentHandler } from '../components/MolliePaymentHandler/MolliePaymentHandler'
import { PaymentToggle } from '../components/MolliePaymentToggle/MolliePaymentToggle'
import { MolliePlaceOrder } from '../components/MolliePlaceOrder/MolliePlaceOrder'

export const mollie_methods_ideal: PaymentModule = {
  PaymentToggle,
  PaymentOptions: MollieIdealOptions,
  PaymentPlaceOrder: MolliePlaceOrder,
  PaymentHandler: MolliePaymentHandler,
}
