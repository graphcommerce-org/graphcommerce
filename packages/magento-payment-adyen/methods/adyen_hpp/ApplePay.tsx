import { styled } from '@mui/material'
import { Trans } from '@lingui/react'
import { ErrorSnackbar, Button } from '@graphcommerce/next-ui'
import AdyenCheckout from '@adyen/adyen-web'
import ApplePayElement from '@adyen/adyen-web/dist/types/components/ApplePay'
import { usePaymentMethodContext } from '@graphcommerce/magento-cart-payment-method'
import { useEffect, useRef, useState } from 'react'
import { useFormCompose } from '@graphcommerce/react-hook-form'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { useAdyenPaymentMethod } from '../../hooks/useAdyenPaymentMethod'
import { useAdyenCartLock } from '../../hooks/useAdyenCartLock'
import { ResultCodeEnum, isResultCodeEnum } from '../../hooks/useAdyenHandlePaymentResponse'
import {
  AdyenHppPaymentOptionsAndPlaceOrderMutation,
  AdyenHppPaymentOptionsAndPlaceOrderMutationVariables,
  AdyenHppPaymentOptionsAndPlaceOrderDocument,
} from './AdyenHppPaymentOptionsAndPlaceOrder.gql'
import { refresh } from '../../lib/common'

import '@adyen/adyen-web/dist/adyen.css'

const getResultCode = (result): ResultCodeEnum => {
  return result?.data?.placeOrder?.order.adyen_payment_status?.resultCode &&
  isResultCodeEnum(result?.data?.placeOrder?.order.adyen_payment_status?.resultCode) ? 
  result?.data?.placeOrder?.order.adyen_payment_status?.resultCode : ResultCodeEnum.Error
}

const ApplePayContainer = styled('div')(({ theme }) => ({
  margin: '0 auto',  
  display: 'block',
  width: '40%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  },
}))

export default function ApplePay (props) {
  const { step, code, brandCode, cart } = props

  const paymentContainer = useRef(null)
  const stateData = useRef<string | undefined>(undefined);
  const action = useRef<string | undefined>(undefined);
  const orderNumber = useRef<string>("");
  const [applePay, setApplePay] = useState<ApplePayElement | undefined>(undefined);
  const [error, setError] = useState<boolean>(false);
  // @ts-ignore
  const { paymentMethodsResponse } = useAdyenPaymentMethod(brandCode)
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
        if (state.isValid) {
          const data = JSON.stringify(state.data)
          stateData.current = data
          setValue('stateData', data)
          submit()
          console.info("onSubmit set stateData done")
        } else {
          setError(true)
        }
      },
      onError: (error: any, _component: any) => {
        console.error(error)
        setError(true)
      },
    })

    // The 'ignore' flag is used to avoid double re-rendering caused by React 18 StrictMode
    // More about it here: https://beta.reactjs.org/learn/synchronizing-with-effects#fetching-data
    if (paymentContainer.current && !ignore) {
      console.info('creating checkout at the end')
      const options = {
        amount: {
          value: (parseFloat(cart?.prices?.grand_total?.value) * 100),
          currency: cart?.prices?.grand_total?.currency,
        },
        countryCode: process.env.NEXT_PUBLIC_ADYEN_COUNTRY_CODE,
        buttonType: 'check-out'
      }

      if (applePay === undefined) {
        // @ts-ignore
        const component: ApplePayElement = checkout.create(brandCode, options);

        component.isAvailable().then(() => {
          // @ts-ignore
          setApplePay(component.mount(paymentContainer.current));
        })
        .catch(e => {
            //Apple Pay is not available
            console.info(e)
        });
      } else {
        console.info(`remounting ${brandCode}`)
        applePay.unmount()
        // @ts-ignore
        const component: ApplePayElement = checkout.create(brandCode, options);
        component.isAvailable().then(() => {
          // @ts-ignore
          setApplePay(component.mount(paymentContainer.current));
        })
        .catch(e => {
            //Apple Pay is not available
            console.info(e)
        });
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
   AdyenHppPaymentOptionsAndPlaceOrderMutation,
   AdyenHppPaymentOptionsAndPlaceOrderMutationVariables & { issuer?: string }
 >(AdyenHppPaymentOptionsAndPlaceOrderDocument, {
   onBeforeSubmit: async (vars) => {
    // @ts-ignore
    await lock({ method: selectedMethod.code, adyen: '1' })

    const data = await new Promise<string>((resolve) => {
      (function waitFor() {
          if (stateData.current !== undefined) return resolve(stateData.current);
          setTimeout(waitFor, 30);
      })();
    });

    return {
    ...vars,
    stateData: data,
    brandCode
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

    // Case 1: Place Order failure -> Show error message and remount applePay component
    if (result.errors || !merchantReference || !selectedMethod?.code) {
      console.info("recreating component")
      createCheckout()
      return
    }

    // Case 2: Authorised successfully
    if (resultCode == ResultCodeEnum.Authorised) {
      console.info(`${brandCode} payment success`)
      await onSuccess(merchantReference)
    }
   },
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
      <ApplePayContainer className='applepay-container'>
        <div ref={paymentContainer} className='payment' />
      </ApplePayContainer>
      <input type="hidden" {...register("stateData", {required: true})} required={true} />
      <ErrorSnackbar
        open={error}
        variant='pill'
        action={
          <>
            <Trans id='Unable to complete the payment, please try again or select a different payment method. ' />
            <Button size='medium' variant='pill' color='secondary' onClick={refresh}>
              <Trans id='Retry' />
            </Button>
          </>
        }
      ></ErrorSnackbar>
    </form>
  )
}