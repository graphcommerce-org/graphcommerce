import { useCartQuery } from '@graphcommerce/magento-cart'
import { PaymentMethodButtonProps } from '@graphcommerce/magento-cart-payment-method'
import { GetPaymentMethodContextDocument } from '@graphcommerce/magento-cart-payment-method/PaymentMethodContext/GetPaymentMethodContext.gql'
import type { PluginProps } from '@graphcommerce/next-config'
import { sendEvent } from '../api/sendEvent'
import { cartToAddPaymentInfo } from '../mapping/cartToAddPaymentInfo/cartToAddPaymentInfo'

export const component = 'PaymentMethodButton'
export const exported = '@graphcommerce/magento-cart-payment-method'

function GoogleDatalayerPaymentMethodButton(props: PluginProps<PaymentMethodButtonProps>) {
  const { Prev, onSubmitSuccessful, ...rest } = props
  const methodContext = useCartQuery(GetPaymentMethodContextDocument)

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

export const Plugin = GoogleDatalayerPaymentMethodButton
