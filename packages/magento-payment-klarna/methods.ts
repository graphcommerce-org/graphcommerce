import { PaymentModule } from '@graphcommerce/magento-cart-payment-method'
import { KlarnaPaymentActionCard } from './components/KlarnaPaymentActionCard/KlarnaPaymentActionCard'
import { KlarnaPaymentOptions } from './components/KlarnaPaymentOptions/KlarnaPaymentOptions'
import { KlarnaPaymentPlaceOrder } from './components/KlarnaPaymentPlaceOrder/KlarnaPaymentPlaceOrder'

export const component = 'PaymentMethodContextProvider'
export const exported = '@graphcommerce/magento-cart-payment-method'

const KlarnaModule: PaymentModule = {
  PaymentOptions: KlarnaPaymentOptions,
  PaymentActionCard: KlarnaPaymentActionCard,
  PaymentPlaceOrder: KlarnaPaymentPlaceOrder,
}

export const klarna: Record<string, PaymentModule> = {
  klarna_kco: KlarnaModule,
  klarna_pay_now: KlarnaModule,
  klarna_pay_later: KlarnaModule,
  klarna_pay_over_time: KlarnaModule,
}
