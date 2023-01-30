import { PaymentMethodOptionsNoop, PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { MollieActionCard } from '@graphcommerce/mollie-magento-payment/components/MollieActionCard/MollieIdealActionCard'
import { MolliePaymentHandler } from '@graphcommerce/mollie-magento-payment/components/MolliePaymentHandler/MolliePaymentHandler'
import { MolliePlaceOrder } from '@graphcommerce/mollie-magento-payment/components/MolliePlaceOrder/MolliePlaceOrder'
import giftcardIcon from '../icons/giftcard.svg'

export const mollie_methods_giftcard: PaymentModule = {
  PaymentOptions: PaymentMethodOptionsNoop,
  PaymentPlaceOrder: MolliePlaceOrder,
  PaymentHandler: MolliePaymentHandler,
  PaymentActionCard: (props) => <MollieActionCard icon={giftcardIcon} {...props} />,
}
