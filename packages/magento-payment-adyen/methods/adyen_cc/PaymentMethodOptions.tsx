import AdyenCheckout from '@adyen/adyen-web'
import { CardElement } from '@adyen/adyen-web/dist/types/components/Card/Card'
import Core from '@adyen/adyen-web/dist/types/core/core'
import { CoreOptions } from '@adyen/adyen-web/dist/types/core/types'
import { PaymentAction } from '@adyen/adyen-web/dist/types/types'
import { ApolloErrorSnackbar, useFormCompose } from '@graphcommerce/ecommerce-ui'
import { useLazyQuery, useMutation } from '@graphcommerce/graphql'
import { useFormGqlMutationCart, useCurrentCartId, useCartQuery } from '@graphcommerce/magento-cart'
import { BillingPageDocument } from '@graphcommerce/magento-cart-checkout'
import {
  PaymentOptionsProps,
  usePaymentMethodContext,
} from '@graphcommerce/magento-cart-payment-method'
import { ErrorSnackbar } from '@graphcommerce/next-ui'
import { composedFormContext } from '@graphcommerce/react-hook-form/src/ComposedForm/context'
import { Trans } from '@lingui/react'
import { Box } from '@mui/material'
import { useContext, useEffect, useRef, useState } from 'react'
import { AdyenPaymentDetailsDocument } from '../../components/AdyenPaymentHandler/AdyenPaymentDetails.gql'
import { AdyenPaymentStatusDocument } from '../../components/AdyenPaymentHandler/AdyenPaymentStatus.gql'
import { useAdyenCheckoutConfig } from '../../hooks/useAdyenCheckoutConfig'
import { ResultCodeEnum, isResultCodeEnum } from '../../hooks/useAdyenHandlePaymentResponse'
import {
  AdyenCcPaymentOptionsAndPlaceOrderMutation,
  AdyenCcPaymentOptionsAndPlaceOrderMutationVariables,
  AdyenCcPaymentOptionsAndPlaceOrderDocument,
} from './AdyenCcPaymentOptionsAndPlaceOrder.gql'
import '@adyen/adyen-web/dist/adyen.css'

const getResultCode = (result): ResultCodeEnum =>
  result?.data?.placeOrder?.order.adyen_payment_status?.resultCode &&
  isResultCodeEnum(result?.data?.placeOrder?.order.adyen_payment_status?.resultCode as string)
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
  const [showError, setShowError] = useState(false)
  const action = useRef<string | undefined>(undefined)
  const orderNumber = useRef<string>('')
  const { currentCartId } = useCurrentCartId()
  const [getDetails] = useMutation(AdyenPaymentDetailsDocument)
  const [getStatus] = useLazyQuery(AdyenPaymentStatusDocument, { fetchPolicy: 'network-only' })
  const { selectedMethod, onSuccess } = usePaymentMethodContext()
  const paymentContainer = useRef<HTMLDivElement>(null)
  const component = useRef<CardElement | null>(null)
  const [, dispatch] = useContext(composedFormContext)
  const billingPage = useCartQuery(BillingPageDocument, { fetchPolicy: 'cache-and-network' }).data
    ?.cart?.billing_address

  const checkout = useAdyenCheckout({
    onSubmit: (state) => {
      const stateDataWithBillingAddress = {
        ...state.data,
        billingAddress: {
          street: billingPage?.street?.[0],
          postalCode: billingPage?.postcode,
          city: billingPage?.city,
          houseNumberOrName: billingPage?.street?.[1],
          country: billingPage?.country?.code,
        },
      }
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      if (state.isValid) setValue('stateData', JSON.stringify(stateDataWithBillingAddress))
    },
    onAdditionalDetails: async (state) => {
      console.info(`${brandCode}: onAdditionalDetails`)
      console.info('onAdditionalDetails', state)

      const payload = JSON.stringify({ orderId: orderNumber, details: state.data.details })

      // Attempt 1; We first try and handle the payment for the order.
      const details = await getDetails({
        errorPolicy: 'all',
        variables: { cartId: currentCartId, payload },
      })

      let paymentStatus = details.data?.adyenPaymentDetails

      // Attempt 2; The adyenPaymentDetails mutation failed, because it was already called previously or no payment had been made.
      if (details.errors) {
        const status = await getStatus({
          errorPolicy: 'all',
          variables: { cartId: currentCartId, orderNumber: orderNumber.current },
        })
        paymentStatus = status.data?.adyenPaymentStatus
        console.error(`payment failed: ${paymentStatus?.resultCode}`)

        // Restart component and show error message
        component.current?.remount()
        setShowError(true)
        dispatch({ type: 'SUBMITTED', isSubmitSuccessful: false })
      }

      if (paymentStatus?.resultCode === ResultCodeEnum.Authorised) {
        console.info(`${brandCode} payment success`)
        await onSuccess(orderNumber.current)
      }
    },
    onError: (e) => {
      console.error(e)
    },
  })

  useEffect(() => {
    if (component.current || !checkout || !paymentContainer.current) return
    component.current = checkout
      .create('card', {
        hasHolderName: true,
        holderNameRequired: true,
        billingAddressRequired: false,
      })
      .mount(paymentContainer.current)
  }, [checkout])

  // Set Adyen client data on payment and place order
  const form = useFormGqlMutationCart<
    AdyenCcPaymentOptionsAndPlaceOrderMutation,
    AdyenCcPaymentOptionsAndPlaceOrderMutationVariables & { issuer?: string }
  >(AdyenCcPaymentOptionsAndPlaceOrderDocument, {
    onBeforeSubmit: (vars) => {
      if (!component.current) throw Error('Adyen component not mounted yet')
      component.current.submit()

      // ?locked=1&adyen=1
      const currentUrl = new URL(window.location.href.replace(window.location.hash, ''))
      currentUrl.searchParams.set('cart_id', vars.cartId)
      currentUrl.searchParams.set('locked', '1')
      currentUrl.searchParams.set('adyen', '1')
      const returnUrl = currentUrl.toString()

      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      return { ...vars, stateData: getValues('stateData'), returnUrl }
    },
    onComplete: async (result) => {
      const merchantReference = result.data?.placeOrder?.order.order_number
      if (merchantReference !== undefined && merchantReference !== null) {
        orderNumber.current = merchantReference
      }

      const isAction = result?.data?.placeOrder?.order.adyen_payment_status?.action
      if (isAction !== undefined && isAction !== null) {
        action.current = isAction
      }

      const resultCode = getResultCode(result)

      // Case 1: Non-3DS/Place Order failure -> Restart component and show error message
      if (result.errors || !merchantReference || !selectedMethod?.code) {
        component.current?.remount()
        setShowError(true)
        dispatch({ type: 'SUBMITTED', isSubmitSuccessful: false })
        return
      }

      // Case 2: Non-3DS Authorised successfully
      if (resultCode === ResultCodeEnum.Authorised) {
        console.info(`${brandCode} payment success`)
        await onSuccess(merchantReference)
      }

      // Case 3: 3DS challenge action -> start 3DS flow
      if (
        (resultCode === ResultCodeEnum.IdentifyShopper ||
          resultCode === ResultCodeEnum.ChallengeShopper) &&
        action.current
      ) {
        component.current?.handleAction({
          ...JSON.parse(action.current),
          // url: 'https://test.adyen.com/hpp/3d/validate.shtml', // <-- Remove after development
        } as PaymentAction)
      }
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
      <ErrorSnackbar open={showError}>
        <Trans id="The payment hasn't completed, please try again or select a different payment method." />
      </ErrorSnackbar>
    </Container>
  )
}
