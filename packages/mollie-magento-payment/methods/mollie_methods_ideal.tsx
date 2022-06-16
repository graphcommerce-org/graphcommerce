import { PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { MollieActionCard } from '../components/MollieActionCard/MollieIdealActionCard'
import { MollieIdealOptions } from '../components/MollieOptionsIssuer/MollieIdealOptions'
import { MolliePaymentHandler } from '../components/MolliePaymentHandler/MolliePaymentHandler'
import { MolliePlaceOrder } from '../components/MolliePlaceOrder/MolliePlaceOrder'
import idealIcon from '../icons/ideal.svg'

export const mollie_methods_ideal: PaymentModule = {
  PaymentOptions: MollieIdealOptions,
  PaymentPlaceOrder: MolliePlaceOrder,
  PaymentHandler: MolliePaymentHandler,
  PaymentActionCard: (props) => <MollieActionCard {...props} icon={idealIcon} />,
}
