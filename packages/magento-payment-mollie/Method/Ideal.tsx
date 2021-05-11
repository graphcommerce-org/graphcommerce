import { PaymentModule } from '@reachdigital/magento-cart-payment-method'
import MollieToggle from '../PaymentToggle/PaymentToggle'
import MollieIdealOptions from './IdealOptions'
import IdealPlaceOrder from './IdealPlaceOrder'

const MollieIdeal: PaymentModule = {
  PaymentToggle: MollieToggle,
  PaymentOptions: MollieIdealOptions,
  PaymentPlaceOrder: IdealPlaceOrder,
}

export default MollieIdeal
