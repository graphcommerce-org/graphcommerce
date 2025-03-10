import type { PaymentModule } from '@graphcommerce/magento-cart-payment-method/Api/PaymentMethod'
import { PaymentMethodOptionsNoop } from '@graphcommerce/magento-cart-payment-method/PaymentMethodOptionsNoop/PaymentMethodOptionsNoop'
import { PaymentMethodPlaceOrderNoop } from '@graphcommerce/magento-cart-payment-method/PaymentMethodPlaceOrderNoop/PaymentMethodPlaceOrderNoop'
import { ActionCard, iconCreditCard, IconSvg } from '@graphcommerce/next-ui'
import { CheckmoPaymentOptions } from './components/CheckmoPaymentOptions'

export const checkmo: PaymentModule = {
  PaymentOptions: CheckmoPaymentOptions,
  PaymentPlaceOrder: PaymentMethodPlaceOrderNoop,
  PaymentActionCard: (props) => <ActionCard {...props} image={<IconSvg src={iconCreditCard} />} />,
}

export const banktransfer: PaymentModule = {
  PaymentOptions: PaymentMethodOptionsNoop,
  PaymentPlaceOrder: PaymentMethodPlaceOrderNoop,
  PaymentActionCard: (props) => <ActionCard {...props} image={<IconSvg src={iconCreditCard} />} />,
}

export const free: PaymentModule = {
  PaymentOptions: PaymentMethodOptionsNoop,
  PaymentPlaceOrder: PaymentMethodPlaceOrderNoop,
  PaymentActionCard: (props) => <ActionCard {...props} image={<IconSvg src={iconCreditCard} />} />,
}

export const cashondelivery: PaymentModule = {
  PaymentOptions: PaymentMethodOptionsNoop,
  PaymentPlaceOrder: PaymentMethodPlaceOrderNoop,
  PaymentActionCard: (props) => <ActionCard {...props} image={<IconSvg src={iconCreditCard} />} />,
}
