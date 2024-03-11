import { useApolloClient, useMutation } from '@graphcommerce/graphql'
import { useAssignCurrentCartId, useCurrentCartId } from '@graphcommerce/magento-cart'
import {
  PaymentHandlerProps,
  usePaymentMethodContext,
} from '@graphcommerce/magento-cart-payment-method'
import { ErrorSnackbar } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { useEffect } from 'react'
import { useMSPCartLock } from '../../hooks/useMSPCartLock'
import { MSPPaymentHandlerDocument } from './MSPPaymentHandler.gql'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'

export const MSPPaymentHandler = (props: PaymentHandlerProps) => {
  const { code } = props
  const [lockStatus, , unlock] = useMSPCartLock()
  const assignCurrentCartId = useAssignCurrentCartId()
  const { onSuccess } = usePaymentMethodContext()
  const { cache } = useApolloClient()
  const [restore, { error }] = useMutation(MSPPaymentHandlerDocument)

  const {
    justLocked,
    success,
    cart_id: cartId,
    locked,
    method,
    order_number,
    customer_token,
  } = lockStatus

  const canProceed = !(justLocked || !locked || !cartId || method !== code)

  // When the payment has failed we restore the current cart
  const shouldRestore = canProceed && success !== '1'
  useEffect(() => {
    if (!shouldRestore) return
    if (customer_token)
      cache.writeQuery({
        query: CustomerTokenDocument,
        data: {
          customerToken: {
            token: customer_token,
            valid: true,
            createdAt: new Date().toUTCString(),
            __typename: 'CustomerToken',
          },
        },
      })
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    restore({ variables: { cartId } }).then(({ data }) => {
      if (!data?.getPaymentMeta) return undefined
      assignCurrentCartId(data.getPaymentMeta)
      return unlock({ success: null, order_number: null, customer_token: null })
    })
  }, [assignCurrentCartId, cache, cartId, customer_token, restore, shouldRestore, unlock])

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
