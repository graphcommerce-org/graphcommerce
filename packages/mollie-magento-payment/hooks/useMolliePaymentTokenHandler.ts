import { useMutation } from '@apollo/client'
import { PaymentStatusEnum } from '@graphcommerce/graphql'
import { useClearCurrentCartId, useCurrentCartId } from '@graphcommerce/magento-cart'
import { useCartLock, usePaymentMethodContext } from '@graphcommerce/magento-cart-payment-method'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { UseMolliePaymentTokenHandlerDocument } from './UseMolliePaymentTokenHandler.graphql'

const successStatusses: PaymentStatusEnum[] = ['AUTHORIZED', 'COMPLETED', 'PAID', 'SHIPPING']

export function useMolliePaymentTokenHandler() {
  const router = useRouter()
  const method = usePaymentMethodContext()
  const cartId = useCurrentCartId()
  const clear = useClearCurrentCartId()

  const isMollie = method.selectedMethod?.code.startsWith('mollie_methods')

  const paymentToken = router.query.payment_token as string | undefined
  // const orderHash = router.query.orderHash
  const [handlePaymentToken, res] = useMutation(UseMolliePaymentTokenHandlerDocument, {
    errorPolicy: 'all',
  })
  const { lock, locked } = useCartLock()

  useEffect(() => {
    if (locked && !paymentToken && isMollie) lock(false)
  }, [isMollie, lock, locked, paymentToken])

  useEffect(() => {
    if (!paymentToken || res.called || res.error)
      return // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      const result = await handlePaymentToken({ variables: { paymentToken } })

      const paymentStatus = result.data?.mollieProcessTransaction?.paymentStatus
      const returnedCartId = result.data?.mollieProcessTransaction?.cart?.id

      if (result.errors || !paymentStatus) return

      if (successStatusses.includes(paymentStatus)) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        await router.push({ pathname: '/checkout/success', query: { cartId } })
        clear()
      } else if (returnedCartId) {
        lock(false)
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.replace('/checkout/payment')
      } else {
        throw Error('Mollie backend error occured')
      }
    })()
  }, [
    cartId,
    clear,
    handlePaymentToken,
    isMollie,
    lock,
    paymentToken,
    res.called,
    res.error,
    router,
  ])

  return res
}
