import { PaymentMethodOptionsNoop, PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { MollieActionCard } from '@graphcommerce/mollie-magento-payment/components/MollieActionCard/MollieIdealActionCard'
import { MolliePaymentHandler } from '../components/MolliePaymentHandler/MolliePaymentHandler'
import { MolliePlaceOrder } from '../components/MolliePlaceOrder/MolliePlaceOrder'
import klarnaIcon from '../icons/klarna.svg'

export const mollie_methods_klarnapaylater: PaymentModule = {
  PaymentOptions: PaymentMethodOptionsNoop,
  PaymentPlaceOrder: MolliePlaceOrder,
  PaymentHandler: MolliePaymentHandler,
  PaymentActionCard: (props) => <MollieActionCard {...props} icon={klarnaIcon} />,
}
