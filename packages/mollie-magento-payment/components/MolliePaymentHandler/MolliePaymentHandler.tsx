import { PaymentStatusEnum, useMutation } from '@graphcommerce/graphql'
import {
  ApolloCartErrorFullPage,
  useClearCurrentCartId,
  useCurrentCartId,
} from '@graphcommerce/magento-cart'
import { usePaymentMethodContext } from '@graphcommerce/magento-cart-payment-method'
import { ErrorSnackbar } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Button, Dialog } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCartLockWithToken } from '../../hooks/useCartLockWithToken'
import { MolliePaymentHandlerDocument } from './MolliePaymentHandler.gql'
import { MollieRecoverCartDocument } from './MollieRecoverCart.gql'

const successStatusses: PaymentStatusEnum[] = ['AUTHORIZED', 'COMPLETED', 'PAID', 'SHIPPING']

export function MolliePaymentHandler() {
  const router = useRouter()
  const method = usePaymentMethodContext()
  const cart_id = useCurrentCartId()
  const clear = useClearCurrentCartId()

  const isMollie = method.selectedMethod?.code.startsWith('mollie_methods')

  const [{ mollie_payment_token, locked, cart_id: lockedCartId }] = useCartLockWithToken()

  const [handle, handleResult] = useMutation(MolliePaymentHandlerDocument)
  const [recoverCart, recoverResult] = useMutation(MollieRecoverCartDocument)

  const { called, error, data } = handleResult

  useEffect(() => {
    if (!mollie_payment_token || called || error || locked)
      return // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      try {
        const result = await handle({ variables: { mollie_payment_token } })

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
        }
      } catch (e) {
        const cartId = cart_id ?? lockedCartId
        if (!cartId) return
        await recoverCart({ variables: { cartId } })
      }
    })()
  }, [
    called,
    cart_id,
    clear,
    error,
    handle,
    locked,
    lockedCartId,
    mollie_payment_token,
    recoverCart,
    router,
  ])

  const paymentStatus = data?.mollieProcessTransaction?.paymentStatus
  if (paymentStatus)
    return (
      <ErrorSnackbar open>
        <Trans>Payment failed with status: {paymentStatus}</Trans>
      </ErrorSnackbar>
    )

  if (!error || recoverResult.loading) return null

  return (
    <Dialog open fullWidth>
      <ApolloCartErrorFullPage
        error={error}
        disableMargin
        button={
          <Button
            variant='contained'
            color='primary'
            size='large'
            onClick={() => {
              clear()
              // eslint-disable-next-line @typescript-eslint/no-floating-promises
              router.push('/')
            }}
          >
            <Trans>Reset Cart and Return to home</Trans>
          </Button>
        }
      >
        <Trans>
          If you’ve successfully paid your order, the order <strong>will</strong> come through, but
          there is a communication error with the website.
        </Trans>
      </ApolloCartErrorFullPage>
    </Dialog>
  )
}
