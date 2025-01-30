import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { useFormCompose } from '@graphcommerce/react-hook-form'
import { t } from '@lingui/macro'
import type { PaymentPlaceOrderProps } from '../Api/PaymentMethod'
import { usePaymentMethodContext } from '../PaymentMethodContext/paymentMethodContextType'
import { assertOrderPlaced } from './assertOrderPlaced'
import { PaymentMethodPlaceOrderNoopDocument } from './PaymentMethodPlaceOrderNoop.gql'

export function PaymentMethodPlaceOrderNoop(props: PaymentPlaceOrderProps) {
  const { step, code } = props
  const { onSuccess } = usePaymentMethodContext()

  const form = useFormGqlMutationCart(PaymentMethodPlaceOrderNoopDocument, {
    onComplete: async (result) => {
      assertOrderPlaced(result)
      console.log('result', result)
      await onSuccess(result.data.placeOrder.order.order_number)
    },
    submitWhileLocked: true,
  })

  const { handleSubmit } = form

  const submit = handleSubmit(() => {})

  useFormCompose({ form, step, submit, key: `PaymentMethodPlaceOrder_${code}` })

  return <form onSubmit={submit} />
}
