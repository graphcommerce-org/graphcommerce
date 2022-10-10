import { PaymentMethodOptionsNoop, PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { ActionCard, iconCreditCard, IconSvg } from '@graphcommerce/next-ui'
import { MolliePaymentHandler } from '../components/MolliePaymentHandler/MolliePaymentHandler'
import { MolliePlaceOrder } from '../components/MolliePlaceOrder/MolliePlaceOrder'

export const mollie_methods_creditcard: PaymentModule = {
  PaymentOptions: PaymentMethodOptionsNoop,
  PaymentPlaceOrder: MolliePlaceOrder,
  PaymentHandler: MolliePaymentHandler,
  PaymentActionCard: (props) => <ActionCard {...props} image={<IconSvg src={iconCreditCard} />} />,
}
