import type { PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { PaymentMethodPlaceOrderNoop } from '@graphcommerce/magento-cart-payment-method'
import { ActionCard, IconSvg, iconCreditCard } from '@graphcommerce/next-ui'
import { PurchaseOrderOptions } from './PurchaseOrderOptions'

export const purchaseorder: PaymentModule = {
  PaymentOptions: PurchaseOrderOptions,
  PaymentPlaceOrder: PaymentMethodPlaceOrderNoop,
  PaymentActionCard: (props) => <ActionCard {...props} image={<IconSvg src={iconCreditCard} />} />,
}
