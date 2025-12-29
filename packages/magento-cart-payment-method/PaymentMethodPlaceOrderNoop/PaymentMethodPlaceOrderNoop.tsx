import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { useFormCompose } from '@graphcommerce/react-hook-form'
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
      // After assertOrderPlaced, result.data.placeOrder.order.order_number is guaranteed
      const orderNumber = (result.data as { placeOrder: { order: { order_number: string } } })
        .placeOrder.order.order_number
      await onSuccess(orderNumber)
    },
    submitWhileLocked: true,
  })

  const { handleSubmit } = form

  const submit = handleSubmit(() => {})

  useFormCompose({ form, step, submit, key: `PaymentMethodPlaceOrder_${code}` })

  return <form onSubmit={submit} />
}
