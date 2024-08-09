import { useCartQuery } from '@graphcommerce/magento-cart'
import { PaymentMethodButtonProps } from '@graphcommerce/magento-cart-payment-method'
import { GetPaymentMethodContextDocument } from '@graphcommerce/magento-cart-payment-method/PaymentMethodContext/GetPaymentMethodContext.gql'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { useSendEvent } from '../api/sendEvent'
import { cartToAddPaymentInfo } from '../mapping/cartToAddPaymentInfo/cartToAddPaymentInfo'

export const config: PluginConfig = {
  module: '@graphcommerce/magento-cart-payment-method',
  type: 'component',
}

export function PaymentMethodButton(props: PluginProps<PaymentMethodButtonProps>) {
  const { Prev, onSubmitSuccessful, ...rest } = props
  const methodContext = useCartQuery(GetPaymentMethodContextDocument)

  const sendEvent = useSendEvent()
  return (
    <Prev
      {...rest}
      onSubmitSuccessful={() => {
        if (methodContext.data?.cart) {
          sendEvent('add_payment_info', cartToAddPaymentInfo(methodContext.data.cart))
        }
        return onSubmitSuccessful?.()
      }}
    />
  )
}
