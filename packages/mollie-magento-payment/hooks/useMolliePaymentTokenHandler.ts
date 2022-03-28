import { useMutation, PaymentStatusEnum } from '@graphcommerce/graphql'
import { useClearCurrentCartId, useCurrentCartId } from '@graphcommerce/magento-cart'
import { usePaymentMethodContext } from '@graphcommerce/magento-cart-payment-method'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { UseMolliePaymentTokenHandlerDocument } from './UseMolliePaymentTokenHandler.gql'
import { useCartLockWithToken } from './useCartLockWithToken'

const successStatusses: PaymentStatusEnum[] = ['AUTHORIZED', 'COMPLETED', 'PAID', 'SHIPPING']

export function useMolliePaymentTokenHandler() {
  const router = useRouter()
  const method = usePaymentMethodContext()
  const cart_id = useCurrentCartId()
  const clear = useClearCurrentCartId()

  const isMollie = method.selectedMethod?.code.startsWith('mollie_methods')

  const [{ mollie_payment_token, locked }] = useCartLockWithToken()

  const [handlePaymentToken, handleResult] = useMutation(UseMolliePaymentTokenHandlerDocument, {
    errorPolicy: 'all',
  })

  useEffect(() => {
    if (!mollie_payment_token || handleResult.called || handleResult.error || locked)
      return // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      const result = await handlePaymentToken({ variables: { mollie_payment_token } })

      const paymentStatus = result.data?.mollieProcessTransaction?.paymentStatus
      const returnedCartId = result.data?.mollieProcessTransaction?.cart?.id

      if (result.errors || !paymentStatus) return

      if (successStatusses.includes(paymentStatus)) {
        clear()
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        await router.push({ pathname: '/checkout/success', query: { cart_id } })
      } else if (returnedCartId) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.replace('/checkout/payment')
      } else {
        throw Error('Mollie backend error occured')
      }
    })()
  }, [
    cart_id,
    clear,
    handlePaymentToken,
    handleResult.called,
    handleResult.error,
    locked,
    mollie_payment_token,
    router,
  ])

  return handleResult
}
