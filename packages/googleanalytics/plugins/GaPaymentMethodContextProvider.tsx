import type { PaymentMethodContextProviderProps } from '@graphcommerce/magento-cart-payment-method'
import type { PluginProps } from '@graphcommerce/next-config'

export const component = 'PaymentMethodContextProvider'
export const exported = '@graphcommerce/magento-cart-payment-method'

function GaPaymentMethodContextProvider(props: PluginProps<PaymentMethodContextProviderProps>) {
  const { Prev, onSuccess, ...rest } = props
  return (
    <Prev
      {...rest}
      onSuccess={async (orderNumber, cart) => {
        // Todo - add GA event here
        await onSuccess?.(orderNumber, cart)
      }}
    />
  )
}
export const Plugin = GaPaymentMethodContextProvider
