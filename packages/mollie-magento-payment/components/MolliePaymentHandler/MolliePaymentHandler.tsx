import { useMutation } from '@graphcommerce/graphql'
import { PaymentStatusEnum } from '@graphcommerce/graphql-mesh'
import { ApolloCartErrorFullPage, useClearCurrentCartId } from '@graphcommerce/magento-cart'
import {
  PaymentHandlerProps,
  usePaymentMethodContext,
} from '@graphcommerce/magento-cart-payment-method'
import { ErrorSnackbar } from '@graphcommerce/next-ui'
import { Trans } from '@graphcommerce/lingui-next'
import { Button, Dialog } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCartLockWithToken } from '../../hooks/useCartLockWithToken'
import { MolliePaymentHandlerDocument } from './MolliePaymentHandler.gql'
import { MollieRecoverCartDocument } from './MollieRecoverCart.gql'

const successStatusses: PaymentStatusEnum[] = ['AUTHORIZED', 'COMPLETED', 'PAID', 'SHIPPING']

export function MolliePaymentHandler({ code }: PaymentHandlerProps) {
  const router = useRouter()
  const method = usePaymentMethodContext()
  const clear = useClearCurrentCartId()

  const [lockState] = useCartLockWithToken()

  const isActive = method.selectedMethod?.code === code || lockState.method === code

  const [handle, handleResult] = useMutation(MolliePaymentHandlerDocument)
  const [recoverCart, recoverResult] = useMutation(MollieRecoverCartDocument)

  const { called, error, data } = handleResult

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      if (!isActive) return
      if (lockState.locked && lockState.justLocked) return

      if (!lockState.mollie_payment_token) return
      if (called || error) return

      const result = await handle({
        variables: { mollie_payment_token: lockState.mollie_payment_token },
      })

      const paymentStatus = result.data?.mollieProcessTransaction?.paymentStatus
      let returnedCartId = result.data?.mollieProcessTransaction?.cart?.id

      if (paymentStatus === 'OPEN' && lockState.cart_id) {
        const res = await recoverCart({ variables: { cartId: lockState.cart_id } })
        returnedCartId = res.data?.mollieRestoreCart?.cart.id
      }

      if (result.errors || !paymentStatus) return

      if (successStatusses.includes(paymentStatus)) {
        clear()
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        await router.push({ pathname: '/checkout/success', query: { cart_id: lockState.cart_id } })
      } else if (returnedCartId) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        router.replace('/checkout/payment')
      }
    })()
  }, [called, clear, error, handle, isActive, lockState, recoverCart, router])

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
