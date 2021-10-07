import { PaymentMethodOptionsNoop, PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import MollieToggle from '../components/MolliePaymentToggle/MolliePaymentToggle'
import MolliePlaceOrder from '../components/MolliePlaceOrder/MolliePlaceOrder'

export const mollie_methods_klarnapaylater: PaymentModule = {
  PaymentToggle: MollieToggle,
  PaymentOptions: PaymentMethodOptionsNoop,
  PaymentPlaceOrder: MolliePlaceOrder,
}
