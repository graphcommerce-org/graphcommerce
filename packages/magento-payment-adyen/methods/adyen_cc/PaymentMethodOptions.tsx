import AdyenCheckout from '@adyen/adyen-web'
import { CardElement } from '@adyen/adyen-web/dist/types/components/Card/Card'
import Core from '@adyen/adyen-web/dist/types/core/core'
import { CoreOptions } from '@adyen/adyen-web/dist/types/core/types'
import { ApolloErrorSnackbar, useFormCompose } from '@graphcommerce/ecommerce-ui'
import { useLazyQuery, useMutation } from '@graphcommerce/graphql'
import { useFormGqlMutationCart, useCurrentCartId } from '@graphcommerce/magento-cart'
import {
  PaymentOptionsProps,
  usePaymentMethodContext,
} from '@graphcommerce/magento-cart-payment-method'
import { Box, styled } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { AdyenPaymentDetailsDocument } from '../../components/AdyenPaymentHandler/AdyenPaymentDetails.gql'
import { AdyenPaymentStatusDocument } from '../../components/AdyenPaymentHandler/AdyenPaymentStatus.gql'
import { useAdyenCartLock } from '../../hooks/useAdyenCartLock'
import { ResultCodeEnum, isResultCodeEnum } from '../../hooks/useAdyenHandlePaymentResponse'
import { useAdyenPaymentMethod } from '../../hooks/useAdyenPaymentMethod'
import {
  AdyenCcPaymentOptionsAndPlaceOrderMutation,
  AdyenCcPaymentOptionsAndPlaceOrderMutationVariables,
  AdyenCcPaymentOptionsAndPlaceOrderDocument,
} from './AdyenCcPaymentOptionsAndPlaceOrder.gql'

import '@adyen/adyen-web/dist/adyen.css'
import { useAdyenCheckoutConfig } from '../../hooks/useAdyenCheckoutConfig'

const getResultCode = (result): ResultCodeEnum =>
  result?.data?.placeOrder?.order.adyen_payment_status?.resultCode &&
  isResultCodeEnum(result?.data?.placeOrder?.order.adyen_payment_status?.resultCode)
    ? result?.data?.placeOrder?.order.adyen_payment_status?.resultCode
    : ResultCodeEnum.Error

type UseAdyenCheckoutOptions = Omit<
  CoreOptions,
  'environment' | 'clientKey' | 'locale' | 'paymentMethodsResponse'
>

function useAdyenCheckout(options?: UseAdyenCheckoutOptions) {
  const [checkout, setCheckout] = useState<Core | null>(null)
  const adyenCheckoutConfig = useAdyenCheckoutConfig()

  const optionsRef = useRef(options)
  optionsRef.current = options

  useEffect(() => {
    if (checkout || !adyenCheckoutConfig.config) return
    ;(async () => {
      setCheckout(await AdyenCheckout({ ...adyenCheckoutConfig.config, ...optionsRef.current }))
    })().catch(console.error)
  }, [checkout, adyenCheckoutConfig.config])

  return checkout
}

export function PaymentMethodOptions(props: PaymentOptionsProps) {
  const { step, code, child: brandCode, Container } = props

  const action = useRef<string | undefined>(undefined)
  const orderNumber = useRef<string>('')
  const { currentCartId } = useCurrentCartId()
  const [getDetails] = useMutation(AdyenPaymentDetailsDocument)
  const [getStatus] = useLazyQuery(AdyenPaymentStatusDocument, { fetchPolicy: 'network-only' })
  const { selectedMethod, onSuccess } = usePaymentMethodContext()

  const checkout = useAdyenCheckout({
    onSubmit: (state) => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (state.isValid) setValue('stateData', JSON.stringify(state.data))
    },
    onAdditionalDetails: async (state) => {
      console.info(`${brandCode}: onAdditionalDetails`)
      console.info('onAdditionalDetails', state)

      const payload = JSON.stringify({ orderId: orderNumber, details: state.data.details })

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
          variables: { cartId: currentCartId, orderNumber: orderNumber.current },
        })
        paymentStatus = status.data?.adyenPaymentStatus
        console.error(`payment failed: ${paymentStatus?.resultCode}`)
      }

      if (paymentStatus?.resultCode == ResultCodeEnum.Authorised) {
        console.info(`${brandCode} payment success`)
        await onSuccess(orderNumber.current)
      }
    },
    onError: (e, component) => {
      console.error(e)
      // setErrorMessage(
      //   'Unable to complete the payment, please try again or select a different payment method. ',
      // )
      // setError(true)
    },
  })

  const paymentContainer = useRef<HTMLDivElement>(null)
  const component = useRef<CardElement | null>(null)

  useEffect(() => {
    if (component.current || !checkout || !paymentContainer.current) return
    component.current = checkout.create('card', {}).mount(paymentContainer.current)
  }, [checkout])

  // Set Adyen client data on payment and place order
  const [, lock] = useAdyenCartLock()
  const form = useFormGqlMutationCart<
    AdyenCcPaymentOptionsAndPlaceOrderMutation,
    AdyenCcPaymentOptionsAndPlaceOrderMutationVariables & { issuer?: string }
  >(AdyenCcPaymentOptionsAndPlaceOrderDocument, {
    onBeforeSubmit: (vars) => {
      if (!component.current) throw Error('Adyen component not mounted yet')
      component.current.submit()

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return { ...vars, stateData: getValues('stateData') }
    },
    onComplete: async (result) => {
      console.debug('place order result:', result)
      const merchantReference = result.data?.placeOrder?.order.order_number
      if (merchantReference !== undefined && merchantReference !== null) {
        orderNumber.current = merchantReference
      }

      const isAction = result?.data?.placeOrder?.order.adyen_payment_status?.action
      if (isAction !== undefined && isAction !== null) {
        action.current = isAction
      }

      const resultCode = getResultCode(result)

      // Case 1: Non-3DS/Place Order failure -> Show error message and remount card component
      if (result.errors || !merchantReference || !selectedMethod?.code) {
        console.info('component shoudl be recreated??')
        // createCheckout()
        return
      }

      // Case 2: Non-3DS Authorised successfully
      if (resultCode === ResultCodeEnum.Authorised) {
        console.info(`${brandCode} payment success`)
        await onSuccess(merchantReference)
      }

      // Case 3: 3DS challenge action -> show popup
      if (action.current !== undefined) {
        // // eslint-disable-next-line @typescript-eslint/no-floating-promises
        // new Promise<CardElement>((resolve) => {
        //   ;(function waitFor() {
        //     if (card !== undefined) return resolve(card)
        //     setTimeout(waitFor, 30)
        //   })()
        // }).then(async (card) => {
        //   const data = JSON.parse(String(action.current))
        //   if (data?.type === 'redirect') {
        //     await lock({ method: selectedMethod.code, adyen: '1', merchantReference })
        //   }
        // })
      }

      // Case 4: 3DS failure -> show retry message
      // Case 5: 3DS challenge action success response -> show success
    },
  })

  const { handleSubmit, setValue, getValues, error } = form
  const submit = handleSubmit(() => {})

  const key = `PaymentMethodOptions_${code}_${brandCode}`

  /** To use an external Pay button we register the current form to be handled there as well. */
  useFormCompose({ form, step, submit, key })

  return (
    <Container>
      <form key={key} onSubmit={submit}>
        <Box ref={paymentContainer} />
        <ApolloErrorSnackbar error={error} />
      </form>
    </Container>
  )
}
