import { PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import MollieCreditCardOptions from '../MollieOptionsToken/MollieCreditCardOptions'
import MollieToggle from '../MolliePaymentToggle/MolliePaymentToggle'
import MolliePlaceOrder from '../MolliePlaceOrder/MolliePlaceOrder'

export const mollie_methods_creditcard: PaymentModule = {
  PaymentToggle: MollieToggle,
  PaymentOptions: MollieCreditCardOptions,
  PaymentPlaceOrder: MolliePlaceOrder,
}
