import { styled } from '@mui/material'
import { Trans } from '@lingui/react'
import { ErrorSnackbar, Button } from '@graphcommerce/next-ui'
import AdyenCheckout from '@adyen/adyen-web'
import { useLazyQuery, useMutation } from '@graphcommerce/graphql'
import { CardElement } from '@adyen/adyen-web/dist/types/components/Card/Card'
import { PaymentOptionsProps, usePaymentMethodContext } from '@graphcommerce/magento-cart-payment-method'
import { useEffect, useRef, useState } from 'react'
import { useFormCompose } from '@graphcommerce/react-hook-form'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { useCurrentCartId } from '@graphcommerce/magento-cart'
import { useAdyenPaymentMethod } from '../../hooks/useAdyenPaymentMethod'
import { useAdyenCartLock } from '../../hooks/useAdyenCartLock'
import { ResultCodeEnum, isResultCodeEnum } from '../../hooks/useAdyenHandlePaymentResponse'
import {
  AdyenCcPaymentOptionsAndPlaceOrderMutation,
  AdyenCcPaymentOptionsAndPlaceOrderMutationVariables,
  AdyenCcPaymentOptionsAndPlaceOrderDocument,
} from './AdyenCcPaymentOptionsAndPlaceOrder.gql'
import { AdyenPaymentDetailsDocument } from '../../components/AdyenPaymentHandler/AdyenPaymentDetails.gql'
import { AdyenPaymentStatusDocument } from '../../components/AdyenPaymentHandler/AdyenPaymentStatus.gql'
import { refresh } from '../../lib/common'

import '@adyen/adyen-web/dist/adyen.css'

const getResultCode = (result): ResultCodeEnum => {
  return result?.data?.placeOrder?.order.adyen_payment_status?.resultCode &&
  isResultCodeEnum(result?.data?.placeOrder?.order.adyen_payment_status?.resultCode) ? 
  result?.data?.placeOrder?.order.adyen_payment_status?.resultCode : ResultCodeEnum.Error
}

const CardContainer = styled('div')(({ theme }) => ({
  height: '100%',
  width: 'max-content',
  display: 'flex',
  alignItems: 'center',
  margin: '0 auto',
  justifyContent: 'center',
  pointerEvents: 'all'
}))

const Checkout = (props) => {
  const { step, code, brandCode } = props

  const paymentContainer = useRef(null)
  const stateData = useRef<string | undefined>(undefined);
  const action = useRef<string | undefined>(undefined);
  const orderNumber = useRef<string>("");
  const [card, setCard] = useState<CardElement | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("Unable to complete the payment, please try again or select a different payment method. ");
  // @ts-ignore
  const { paymentMethodsResponse } = useAdyenPaymentMethod(brandCode)
  const { currentCartId } = useCurrentCartId()
  const [getDetails, { called }] = useMutation(AdyenPaymentDetailsDocument)
  const [getStatus] = useLazyQuery(AdyenPaymentStatusDocument, { fetchPolicy: 'network-only' })
  const { selectedMethod, onSuccess } = usePaymentMethodContext()
  
  let ignore = false
  const config = {
    environment: process.env.NEXT_PUBLIC_ADYEN_ENVIRONMENT,
    clientKey: process.env.NEXT_PUBLIC_ADYEN_CLIENT_KEY,
    locale: process.env.NEXT_PUBLIC_ADYEN_LOCALE,
  }

  const createCheckout = async () => {
    console.info('create checkout')
    const checkout = await AdyenCheckout({
      ...config,
      paymentMethodsResponse,
      onSubmit: (state) => {
        console.info(`${brandCode}: onSubmit`)

        if (state.isValid) {
          const data = JSON.stringify(state.data)
          stateData.current = data
          setValue('stateData', data)
          console.info("onSubmit set stateData done")
        } else {
          setErrorMessage("Unable to complete the payment, please try again or select a different payment method. ")
          setError(true)
        }
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
        }

        if (paymentStatus?.resultCode == ResultCodeEnum.Authorised) {
          console.info(`${brandCode} payment success`)
          await onSuccess(orderNumber.current)
        }
      },
      onError: (error: any, _component: any) => {
        console.error(error)
        setErrorMessage("Unable to complete the payment, please try again or select a different payment method. ");
        setError(true)
      },
    })

    // The 'ignore' flag is used to avoid double re-rendering caused by React 18 StrictMode
    // More about it here: https://beta.reactjs.org/learn/synchronizing-with-effects#fetching-data
    if (paymentContainer.current && !ignore) {
      console.info('creating checkout at the end')
      if (card === undefined) {
        setCard(checkout.create('card').mount(paymentContainer.current))
      } else {
        console.info(`remounting ${brandCode}`)
        card.unmount()
        setCard(checkout.create('card').mount(paymentContainer.current).setStatus('ready'))
      }
    }
  }

  useEffect(() => {
    if (!paymentMethodsResponse || !paymentContainer.current) {
      return
    }

    createCheckout()

    return () => {
      ignore = true
    }
  }, [paymentMethodsResponse])


  // Set Adyen client data on payment and place order
  const [, lock] = useAdyenCartLock()
  const form = useFormGqlMutationCart<
   AdyenCcPaymentOptionsAndPlaceOrderMutation,
   AdyenCcPaymentOptionsAndPlaceOrderMutationVariables & { issuer?: string }
 >(AdyenCcPaymentOptionsAndPlaceOrderDocument, {
   onBeforeSubmit: async (vars) => {   
    new Promise<CardElement>((resolve) => {
        (function waitFor() {
            if (card !== undefined) return resolve(card);
            setTimeout(waitFor, 30);
        })();
    }).then((card) => {
      console.info(`${brandCode} submit() done`)
      card.submit()
    });

    const data = await new Promise<string>((resolve) => {
      (function waitFor() {
          if (stateData.current !== undefined) return resolve(stateData.current);
          setTimeout(waitFor, 30);
      })();
    });

    return {
    ...vars,
    stateData: data,
    }
   },
   onComplete: async (result) => {
    console.debug("place order result:", result)
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
      console.info("recreating component")
      createCheckout()
      return
    }


    // Case 2: Non-3DS Authorised successfully
    if (resultCode == ResultCodeEnum.Authorised) {
      console.info(`${brandCode} payment success`)
      await onSuccess(merchantReference)
    }

    // Case 3: 3DS challenge action -> show popup
    if (action.current !== undefined) {
      new Promise<CardElement>((resolve) => {
        (function waitFor() {
            if (card !== undefined) return resolve(card);
            setTimeout(waitFor, 30);
        })();
      }).then(async (card) => {
        const data = JSON.parse(String(action.current));
        if (data?.type === 'redirect') {
          await lock({ method: selectedMethod.code, adyen: '1', merchantReference })
        }
      });
    }
    
    // Case 4: 3DS failure -> show retry message
    // Case 5: 3DS challenge action success response -> show success
   }
  });


  const { register, handleSubmit, setValue } = form
  const submit = handleSubmit(() => {
      console.info("handleSubmit")
  })

  const key = `PaymentMethodOptions_${code}_${brandCode}`

  /** To use an external Pay button we register the current form to be handled there as well. */
  useFormCompose({ form, step, submit, key })

  // if (error) return <div>Failed to load</div>
  if (!paymentMethodsResponse) return <div>Loading...</div>

  return (
    <form key={key} onSubmit={submit}>
      <CardContainer className='card-container'>
        <div ref={paymentContainer} className='payment' />
      </CardContainer>
      <input type="hidden" {...register("stateData", {
       validate: () => {
        if (card?.isValid == false) {
          setErrorMessage("Please fill all the required card details and try again. ");
          setError(true);

        }
        return card?.isValid === true
       }})}/>
      <ErrorSnackbar
        open={error}
        variant='pill'
        action={
          <>
            <Trans id={errorMessage} />
            <Button size='medium' variant='pill' color='secondary' onClick={refresh}>
              <Trans id='Retry' />
            </Button>
          </>
        }
      ></ErrorSnackbar>
    </form>
  )
}

/** It sets the selected payment method on the cart. */
export function PaymentMethodOptions(props: PaymentOptionsProps) {
  const { code, step, child: brandCode, Container } = props

  /** This is the form that the user can fill in. */
  return (
    <Container>
        <Checkout brandCode={brandCode} code={code} step={step} />
    </Container>
  )
}
