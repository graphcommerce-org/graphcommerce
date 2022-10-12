import {
  PaymentMethodOptionsNoop,
  PaymentMethodPlaceOrderNoop,
  PaymentModule,
} from '@graphcommerce/magento-cart-payment-method'
import { ActionCard, IconSvg, iconCreditCard } from '@graphcommerce/next-ui'

export const checkmo: PaymentModule = {
  PaymentOptions: PaymentMethodOptionsNoop,
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
