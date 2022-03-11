import { PaymentMethodOptionsNoop, PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { PaymentToggle } from '../components/MolliePaymentToggle/MolliePaymentToggle'
import { MolliePlaceOrder } from '../components/MolliePlaceOrder/MolliePlaceOrder'

export const mollie_methods_paypal: PaymentModule = {
  PaymentToggle,
  PaymentOptions: PaymentMethodOptionsNoop,
  PaymentPlaceOrder: MolliePlaceOrder,
}
