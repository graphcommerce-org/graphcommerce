import { PaymentMethodOptionsNoop, PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { MollieActionCard } from '../components/MollieActionCard/MollieIdealActionCard'
import { MolliePaymentHandler } from '../components/MolliePaymentHandler/MolliePaymentHandler'
import { MolliePlaceOrder } from '../components/MolliePlaceOrder/MolliePlaceOrder'
import creditcardIcon from '../icons/creditcard.svg'

export const mollie_methods_creditcard: PaymentModule = {
  PaymentOptions: PaymentMethodOptionsNoop,
  PaymentPlaceOrder: MolliePlaceOrder,
  PaymentHandler: MolliePaymentHandler,
  PaymentActionCard: (props) => <MollieActionCard icon={creditcardIcon} {...props} />,
}
