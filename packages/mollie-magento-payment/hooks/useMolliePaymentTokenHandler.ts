import { useMutation } from '@apollo/client'
import { PaymentStatusEnum } from '@graphcommerce/graphql'
import { useClearCurrentCartId } from '@graphcommerce/magento-cart'
import { useCartLock, usePaymentMethodContext } from '@graphcommerce/magento-cart-payment-method'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { UseMolliePaymentTokenHandlerDocument } from './UseMolliePaymentTokenHandler.gql'

const successStatusses: PaymentStatusEnum[] = ['AUTHORIZED', 'COMPLETED', 'PAID', 'SHIPPING']

export function useMolliePaymentTokenHandler() {
  const router = useRouter()
  const method = usePaymentMethodContext()

  const isMollie = method.selectedMethod?.code.startsWith('mollie_methods')

  const paymentToken = router.query.payment_token as string | undefined
  // const orderHash = router.query.orderHash
  const [handlePaymentToken, res] = useMutation(UseMolliePaymentTokenHandlerDocument, {
    errorPolicy: 'all',
  })
  const clear = useClearCurrentCartId()
  const { lock, locked } = useCartLock()

  useEffect(() => {
    if (locked && !paymentToken && isMollie) {
      lock(false)
    }
  })

  useEffect(() => {
    if (!paymentToken || !isMollie || res.called || res.error)
      return // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      const result = await handlePaymentToken({ variables: { paymentToken } })

      const paymentStatus = result.data?.mollieProcessTransaction?.paymentStatus
      const cartId = result.data?.mollieProcessTransaction?.cart?.id

      if (result.errors || !paymentStatus || !cartId) return

      if (successStatusses.includes(paymentStatus)) {
        clear()
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.push({ pathname: '/checkout/success', query: { cartId } })
      } else {
        lock(false)
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.replace('/checkout/payment')
      }
    })()
  }, [clear, handlePaymentToken, isMollie, lock, paymentToken, res.called, res.error, router])

  return res
}
