import { useFormCompose } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import {
  useCartLock,
  usePaymentMethodContext,
  type CartLockState,
  type PaymentPlaceOrderProps,
} from '@graphcommerce/magento-cart-payment-method'
import { ErrorSnackbar, useUrlQuery } from '@graphcommerce/next-ui'
import { BraintreePaymentMethodPlaceOrderDocument } from '../../graphql/BraintreePaymentMethodPlaceOrder.gql'

type BraintreeLockState = CartLockState & {
  payment_error?: string | null
}

export function PaymentMethodPlaceOrder(props: PaymentPlaceOrderProps) {
  const { step, code } = props
  const { onSuccess } = usePaymentMethodContext()
  const [, , unlock] = useCartLock<BraintreeLockState>()
  const [queryState, setQueryState] = useUrlQuery<BraintreeLockState>()

  const paymentError = queryState.payment_error

  const form = useFormGqlMutationCart(BraintreePaymentMethodPlaceOrderDocument, {
    onComplete: async (result) => {
      const placeOrderErrors = result.data?.placeOrder?.errors
      if (placeOrderErrors && placeOrderErrors.length > 0) {
        const message = placeOrderErrors[0]?.message ?? 'Payment failed, please try again'
        // Write error into URL before unlocking — survives the router remount
        await unlock({ payment_error: message })
        return
      }

      if (!result.data?.placeOrder?.order?.order_number) {
        await unlock({ payment_error: 'Order placement failed, please try again' })
        return
      }

      await onSuccess(result.data.placeOrder.order.order_number)
    },
    submitWhileLocked: true,
  })

  const { handleSubmit } = form
  const submit = handleSubmit(() => {})
  useFormCompose({
    form,
    step,
    submit,
    key: `PaymentMethodPlaceOrder_${code}`,
  })

  return (
    <form onSubmit={submit}>
      {paymentError && (
        <ErrorSnackbar open onClose={() => setQueryState({ ...queryState, payment_error: null })}>
          <>{decodeURIComponent(paymentError)}</>
        </ErrorSnackbar>
      )}
    </form>
  )
}
