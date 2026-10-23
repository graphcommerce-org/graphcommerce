import { useFormCompose } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import {
  assertOrderPlaced,
  useCartLock,
  usePaymentMethodContext,
  type PaymentPlaceOrderProps,
} from '@graphcommerce/magento-cart-payment-method'
import { useEffect, useEffectEvent, useRef } from 'react'
import { BraintreePaymentMethodPlaceOrderDocument } from '../../graphql/BraintreePaymentMethodPlaceOrder.gql'

export function PaymentMethodPlaceOrder(props: PaymentPlaceOrderProps) {
  const { step, code } = props
  const { onSuccess } = usePaymentMethodContext()
  const [, , unlock] = useCartLock()

  const form = useFormGqlMutationCart(BraintreePaymentMethodPlaceOrderDocument, {
    onComplete: async (result) => {
      assertOrderPlaced(result)
      await onSuccess(result.data.placeOrder.order.order_number)
    },
    submitWhileLocked: true,
  })

  const { error, formState, handleSubmit } = form
  const handledError = useRef<unknown>(undefined)
  const unlockAfterError = useEffectEvent(() => {
    void unlock({})
  })

  useEffect(() => {
    if (!error || formState.isSubmitting || handledError.current === error) return undefined

    const timeout = window.setTimeout(() => {
      handledError.current = error
      unlockAfterError()
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [error, formState.isSubmitting])

  const submit = handleSubmit(() => {})
  useFormCompose({
    form,
    step,
    submit,
    key: `PaymentMethodPlaceOrder_${code}`,
  })

  return <form onSubmit={submit} />
}
