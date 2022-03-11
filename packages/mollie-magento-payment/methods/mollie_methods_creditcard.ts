import { PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { MollieCreditCardOptions } from '../components/MollieOptionsToken/MollieCreditCardOptions'
import { PaymentToggle } from '../components/MolliePaymentToggle/MolliePaymentToggle'
import { MolliePlaceOrder } from '../components/MolliePlaceOrder/MolliePlaceOrder'

export const mollie_methods_creditcard: PaymentModule = {
  PaymentToggle,
  PaymentOptions: MollieCreditCardOptions,
  PaymentPlaceOrder: MolliePlaceOrder,
}
