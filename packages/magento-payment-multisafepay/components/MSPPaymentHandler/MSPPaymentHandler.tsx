import { useMutation } from '@graphcommerce/graphql'
import { useAssignCurrentCartId } from '@graphcommerce/magento-cart'
import {
  PaymentHandlerProps,
  usePaymentMethodContext,
} from '@graphcommerce/magento-cart-payment-method'
import { ErrorSnackbar } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { useEffect } from 'react'
import { useMSPCartLock } from '../../hooks/useMSPCartLock'
import { MSPPaymentHandlerDocument } from './MSPPaymentHandler.gql'

export const MSPPaymentHandler = (props: PaymentHandlerProps) => {
  const { code } = props
  const [lockStatus, , unlock] = useMSPCartLock()
  const assignCurrentCartId = useAssignCurrentCartId()
  const { onSuccess } = usePaymentMethodContext()

  const [restore, { error }] = useMutation(MSPPaymentHandlerDocument)

  const { justLocked, success, cart_id: cartId, locked, method, order_number } = lockStatus

  const canProceed = !(justLocked || !locked || !cartId || method !== code)

  // When the payment has failed we restore the current cart
  const shouldRestore = canProceed && success !== '1'
  useEffect(() => {
    if (!shouldRestore) return

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    restore({ variables: { cartId } }).then(({ data }) => {
      if (!data?.getPaymentMeta) return undefined

      assignCurrentCartId(data.getPaymentMeta)
      return unlock({ success: null })
    })
  }, [assignCurrentCartId, cartId, restore, shouldRestore, unlock])

  // If successfull we clear it's cart and redirect to the success page.
  const shouldRedirect = canProceed && success === '1'
  useEffect(() => {
    if (!shouldRedirect || !order_number) return

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    onSuccess(order_number)
  }, [cartId, onSuccess, order_number, shouldRedirect])

  if (error) {
    return (
      <ErrorSnackbar open>
        <Trans id='Payment has not completed succesfully, please try again.' />
      </ErrorSnackbar>
    )
  }
  return null
}
