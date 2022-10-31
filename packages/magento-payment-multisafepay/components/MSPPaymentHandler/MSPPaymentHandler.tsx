import { useMutation } from '@graphcommerce/graphql'
import { useAssignCurrentCartId, useClearCurrentCartId } from '@graphcommerce/magento-cart'
import { PaymentHandlerProps } from '@graphcommerce/magento-cart-payment-method'
import { ErrorSnackbar } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMSPCartLock } from '../../hooks/useMSPCartLock'
import { MSPPaymentHandlerDocument } from './MSPPaymentHandler.gql'

export const MSPPaymentHandler = (props: PaymentHandlerProps) => {
  const { code } = props
  const { push } = useRouter()
  const [lockStatus, , unlock] = useMSPCartLock()
  const assignCurrentCartId = useAssignCurrentCartId()
  const clearCurrentCartId = useClearCurrentCartId()

  const [restore, { error }] = useMutation(MSPPaymentHandlerDocument)

  const { justLocked, success, cart_id: cartId, locked, method } = lockStatus

  const canProceed = !(justLocked || !locked || !cartId || method !== code)

  // When the payment has failed we restore the current cart
  const shouldRestore = canProceed && success !== '1'
  useEffect(() => {
    if (!shouldRestore) return

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    restore({ variables: { cartId } }).then(({ data }) => {
      if (!data?.getPaymentMeta) return

      assignCurrentCartId(data.getPaymentMeta)
      unlock({ success: null })
    })
  }, [assignCurrentCartId, cartId, restore, shouldRestore, unlock])

  // If successfull we clear it's cart and redirect to the success page.
  const shouldRedirect = canProceed && success === '1'
  useEffect(() => {
    if (!shouldRedirect) return

    // We're done with the current cart, we clear the current cartId.
    clearCurrentCartId()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    push({ pathname: '/checkout/success', query: { cart_id: cartId } })
  }, [cartId, clearCurrentCartId, push, shouldRedirect])

  if (error) {
    return (
      <ErrorSnackbar open>
        <Trans id='Payment has not completed succesfully, please try again.' />
      </ErrorSnackbar>
    )
  }
  return null
}
