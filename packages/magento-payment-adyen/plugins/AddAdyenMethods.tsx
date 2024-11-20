import type {
  PaymentMethodContextProviderProps,
  PaymentModule,
} from '@graphcommerce/magento-cart-payment-method'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { AdyenPaymentActionCard } from '../components/AdyenPaymentActionCard/AdyenPaymentActionCard'
import { AdyenPaymentHandler } from '../components/AdyenPaymentHandler/AdyenPaymentHandler'
import { HppOptions } from '../components/AdyenPaymentOptionsAndPlaceOrder/AdyenPaymentOptionsAndPlaceOrder'
import { adyenHppExpandMethods } from '../hooks/adyenHppExpandMethods'

export const adyen_hpp: PaymentModule = {
  PaymentOptions: HppOptions,
  PaymentPlaceOrder: () => null,
  PaymentHandler: AdyenPaymentHandler,
  PaymentActionCard: AdyenPaymentActionCard,
  expandMethods: adyenHppExpandMethods,
}

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-cart-payment-method',
}

export function PaymentMethodContextProvider(
  props: PluginProps<PaymentMethodContextProviderProps>,
) {
  const { modules, Prev, ...rest } = props
  return <Prev {...rest} modules={{ ...modules, adyen_hpp }} />
}
