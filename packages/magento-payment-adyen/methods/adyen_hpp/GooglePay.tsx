import { styled } from '@mui/material'
import Script from 'next/script'
import { Trans } from '@lingui/react'
import { ErrorSnackbar, Button } from '@graphcommerce/next-ui'
import AdyenCheckout from '@adyen/adyen-web'
import GooglePayElement from '@adyen/adyen-web/dist/types/components/GooglePay'
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
import { useAdyenCheckoutConfig } from '../../hooks/useAdyenCheckoutConfig'

const getResultCode = (result): ResultCodeEnum => {
  return result?.data?.placeOrder?.order.adyen_payment_status?.resultCode &&
    isResultCodeEnum(result?.data?.placeOrder?.order.adyen_payment_status?.resultCode)
    ? result?.data?.placeOrder?.order.adyen_payment_status?.resultCode
    : ResultCodeEnum.Error
}

const getEnvironment = (environment: string): string => {
  let result = 'PRODUCTION'
  if (environment.toLowerCase() === 'test') {
    result = 'TEST'
  }
  return result
}

const GooglePayContainer = styled('div')(({ theme }) => ({
  margin: '0 auto',
  display: 'block',
  width: '40%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}))

export default function GooglePay(props) {
  const { step, code, brandCode, cart } = props

  const paymentContainer = useRef(null)
  const stateData = useRef<string | undefined>(undefined)
  const action = useRef<string | undefined>(undefined)
  const orderNumber = useRef<string>('')
  const [googlePay, setGooglePay] = useState<GooglePayElement | undefined>(undefined)
  const [error, setError] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(false)

  const conf = useAdyenPaymentMethod(brandCode)
  const { selectedMethod, onSuccess } = usePaymentMethodContext()

  let ignore = false
  const adyenCheckoutConfig = useAdyenCheckoutConfig()

  const createCheckout = async () => {
    console.info('create checkout')
    const checkout = await AdyenCheckout({
      ...adyenCheckoutConfig,
      onSubmit: (state) => {
        if (state.isValid) {
          const data = JSON.stringify(state.data)
          stateData.current = data
          setValue('stateData', data)
          submit()
          console.info('onSubmit set stateData done')
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
          value: parseFloat(cart?.prices?.grand_total?.value) * 100,
          currency: cart?.prices?.grand_total?.currency,
        },
        configuration: {
          merchantName: process.env.NEXT_PUBLIC_ADYEN_MERCHANT_NAME,
          merchantId: process.env.NEXT_PUBLIC_ADYEN_GOOGLE_PAY_MERCHANT_ID,
          gatewayMerchantId: process.env.NEXT_PUBLIC_ADYEN_MERCHANT_ACCOUNT,
        },
        environment: getEnvironment(String(process.env.NEXT_PUBLIC_ADYEN_ENVIRONMENT)),
        countryCode: process.env.NEXT_PUBLIC_ADYEN_COUNTRY_CODE,
        buttonType: 'checkout',
        buttonSizeMode: 'fill',
      }

      if (googlePay === undefined) {
        // @ts-ignore
        const component: GooglePayElement = checkout.create(brandCode, options)

        component
          .isAvailable()
          .then(() => {
            // @ts-ignore
            setGooglePay(component.mount(paymentContainer.current))
          })
          .catch((e) => {
            //Google Pay is not available
            console.info(e)
          })
      } else {
        console.info(`remounting ${brandCode}`)
        googlePay.unmount()
        // @ts-ignore
        const component: GooglePayElement = checkout.create(brandCode, options)
        component
          .isAvailable()
          .then(() => {
            // @ts-ignore
            setGooglePay(component.mount(paymentContainer.current))
          })
          .catch((e) => {
            //Google Pay is not available
            console.info(e)
          })
      }
    }
  }

  useEffect(() => {
    if (!conf?.paymentMethodsResponse || !paymentContainer.current || loaded === false) {
      console.info('loaded', loaded)
      return
    }

    createCheckout()

    return () => {
      ignore = true
    }
  }, [conf?.paymentMethodsResponse, loaded])

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
        ;(function waitFor() {
          if (stateData.current !== undefined) return resolve(stateData.current)
          setTimeout(waitFor, 30)
        })()
      })

      return {
        ...vars,
        stateData: data,
        brandCode,
      }
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

      // Case 1: Place Order failure -> Show error message and remount googlePay component
      if (result.errors || !merchantReference || !selectedMethod?.code) {
        console.info('recreating component')
        createCheckout()
        return
      }

      // Case 2: Authorised successfully
      if (resultCode == ResultCodeEnum.Authorised) {
        console.info(`${brandCode} payment success`)
        await onSuccess(merchantReference)
      }
    },
  })

  const { register, handleSubmit, setValue } = form
  const submit = handleSubmit(() => {
    console.info('handleSubmit')
  })

  const key = `PaymentMethodOptions_${code}_${brandCode}`

  /** To use an external Pay button we register the current form to be handled there as well. */
  useFormCompose({ form, step, submit, key })

  // if (error) return <div>Failed to load</div>
  if (!conf?.paymentMethodsResponse) return <div>Loading...</div>

  return (
    <form key={key} onSubmit={submit}>
      <Script
        src='https://pay.google.com/gp/p/js/pay.js'
        strategy='lazyOnload'
        onReady={() => {
          console.info(`gpay script loaded correctly.`)
          setLoaded(true)
        }}
      />
      <GooglePayContainer className='googlepay-container'>
        <div ref={paymentContainer} className='payment' />
      </GooglePayContainer>
      <input type='hidden' {...register('stateData', { required: true })} required={true} />
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
