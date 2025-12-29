import type { PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import {
  PaymentMethodOptionsNoop,
  PaymentMethodPlaceOrderNoop,
} from '@graphcommerce/magento-cart-payment-method'
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
