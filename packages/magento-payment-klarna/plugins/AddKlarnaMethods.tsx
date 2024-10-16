import { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import type { PluginProps } from '@graphcommerce/next-config'
import { KlarnaPaymentActionCard } from '../components/KlarnaPaymentActionCard/KlarnaPaymentActionCard'
import { KlarnaPaymentOptions } from '../components/KlarnaPaymentOptions/KlarnaPaymentOptions'
import { KlarnaPaymentPlaceOrder } from '../components/KlarnaPaymentPlaceOrder/KlarnaPaymentPlaceOrder'

export const component = 'PaymentMethodContextProvider'
export const exported = '@graphcommerce/magento-cart-payment-method'

const klarna_pay_later = {
  PaymentOptions: KlarnaPaymentOptions,
  PaymentActionCard: KlarnaPaymentActionCard,
  PaymentPlaceOrder: KlarnaPaymentPlaceOrder,
}

function AddKlarnaMethods(props: PluginProps<PaymentMethodContextProviderProps>) {
  const { modules, Prev, ...rest } = props
  return <Prev {...rest} modules={{ ...modules, klarna_pay_later }} />
}

export const Plugin = AddKlarnaMethods
