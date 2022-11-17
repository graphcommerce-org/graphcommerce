import { useLazyQuery, useMutation } from '@graphcommerce/graphql'
import { useCurrentCartId } from '@graphcommerce/magento-cart'
import { ErrorSnackbar } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { useEffect } from 'react'
import { useAdyenCartLock } from '../../hooks/useAdyenCartLock'
import {
  ResultCodeEnum,
  useAdyenHandlePaymentResponse,
  useAdyenPaymentResponse,
} from '../../hooks/useAdyenHandlePaymentResponse'
import { AdyenPaymentDetailsDocument } from './AdyenPaymentDetails.gql'
import { AdyenPaymentStatusDocument } from './AdyenPaymentStatus.gql'

export function AdyenPaymentHandler() {
  const [lockStatus] = useAdyenCartLock()

  const [getDetails, { called }] = useMutation(AdyenPaymentDetailsDocument)
  const [getStatus] = useLazyQuery(AdyenPaymentStatusDocument, { fetchPolicy: 'network-only' })
  const { currentCartId } = useCurrentCartId()

  const handleResponse = useAdyenHandlePaymentResponse()
  const response = useAdyenPaymentResponse()

  // This is actually due to a bug.
  const isAdyen = lockStatus.adyen?.split('?')[0] === '1'
  const orderNumber = lockStatus.merchantReference ?? lockStatus.adyen?.split('?')[1]?.slice(18)
  const { redirectResult } = lockStatus

  useEffect(() => {
    const call = async () => {
      if (!orderNumber || !isAdyen || !currentCartId || called) return undefined

      const payload = JSON.stringify({ orderId: orderNumber, details: { redirectResult } })

      // Atempt 1; We first try and handle the payment for the order.
      const details = await getDetails({
        errorPolicy: 'all',
        variables: { cartId: currentCartId, payload },
      })

      let paymentStatus = details.data?.adyenPaymentDetails

      // Atempt 2; The adyenPaymentDetails mutation failed, because it was already called previously or no payment had been made.
      if (details.errors) {
        const status = await getStatus({
          errorPolicy: 'all',
          variables: { cartId: currentCartId, orderNumber },
        })
        paymentStatus = status.data?.adyenPaymentStatus
      }
      return handleResponse(orderNumber, paymentStatus)
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    call()
  }, [
    redirectResult,
    getDetails,
    orderNumber,
    isAdyen,
    getStatus,
    called,
    handleResponse,
    currentCartId,
  ])

  if (!response?.resultCode) return null

  if (response.resultCode === ResultCodeEnum.RedirectShopper) {
    return (
      <ErrorSnackbar open>
        <Trans id="The payment hasn't completed, please try again or select a different payment method." />
      </ErrorSnackbar>
    )
  }

  if (response.resultCode === ResultCodeEnum.Refused) {
    return (
      <ErrorSnackbar open>
        <Trans id='The payment is refused, please try again or select a different payment method.' />
      </ErrorSnackbar>
    )
  }

  return (
    <ErrorSnackbar open>
      <Trans
        id='We can not process your payment, we received an unsupported status "<0>{resultCode}</0>". Please try again or select a different payment method.'
        values={{ resultCode: response.resultCode }}
        components={{ 0: <strong /> }}
      />
    </ErrorSnackbar>
  )
}
