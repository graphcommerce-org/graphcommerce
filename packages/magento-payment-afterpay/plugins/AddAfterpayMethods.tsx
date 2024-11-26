import {
  PaymentMethodContextProviderProps,
  PaymentMethodOptionsNoop,
} from '@graphcommerce/magento-cart-payment-method'
import type { PluginProps } from '@graphcommerce/next-config'
import { AfterpayPaymentActionCard } from '../components/AfterpayPaymentActionCard/AfterpayPaymentActionCard'
import { AfterpayPaymentHandler } from '../components/AfterpayPaymentHandler/AfterpayPaymentHandler'
import { AfterpayPaymentPlaceOrder } from '../components/AfterpayPaymentPlaceOrder/AfterpayPaymentPlaceOrder'

export const component = 'PaymentMethodContextProvider'
export const exported = '@graphcommerce/magento-cart-payment-method'

const afterpay = {
  PaymentOptions: PaymentMethodOptionsNoop,
  PaymentActionCard: AfterpayPaymentActionCard,
  PaymentHandler: AfterpayPaymentHandler,
  PaymentPlaceOrder: AfterpayPaymentPlaceOrder,
}

function AddAfterpayMethods(props: PluginProps<PaymentMethodContextProviderProps>) {
  const { modules, Prev, ...rest } = props
  return <Prev {...rest} modules={{ ...modules, afterpay }} />
}

export const Plugin = AddAfterpayMethods
