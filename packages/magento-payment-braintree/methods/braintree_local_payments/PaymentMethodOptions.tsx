import { useCartQuery, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import {
  PaymentOptionsProps,
  usePaymentMethodContext,
} from '@graphcommerce/magento-cart-payment-method'
import { useFormCompose } from '@graphcommerce/react-hook-form'
import { useEffect } from 'react'
import { BraintreePaymentMethodOptionsDocument } from '../../BraintreePaymentMethodOptions.gql'
import { StartPaymentOptions } from '../../hooks/useBraintree'
import { useBraintreeCartLock } from '../../hooks/useBraintreeCartLock'
import { useBraintreeLocalPayment } from '../../hooks/useBraintreeLocalPayment'
import { isBraintreeError } from '../../utils/isBraintreeError'
import {
  BraintreeLocalPaymentsCartDocument,
  BraintreeLocalPaymentsCartQuery,
} from './BraintreeLocalPaymentsCart.gql'

function validateAndBuildStartPaymentParams(cartData: BraintreeLocalPaymentsCartQuery): Partial {
  const cart = cartData?.cart

  const { email } = cart ?? {}
  if (!email) throw Error('Please provide an email address')
  const { value: amount, currency: currencyCode } = cart?.prices?.grand_total ?? {}

  if (!cart?.shipping_addresses?.[0]) throw Error('Please provide a shipping method')
  if (!amount || !currencyCode) throw Error('Grand total was not set')

  const {
    telephone: phone,
    firstname: givenName,
    lastname: surname,
    street,
    city: locality,
    postcode: postalCode,
    region: regionObj,
    country,
  } = cart?.shipping_addresses?.[0] ?? {}

  const [streetAddress, ...rest] = street ?? []
  const extendedAddress = rest.join('\n')
  if (!streetAddress) throw Error('Please provide a street address')

  const region = regionObj?.code ?? ''
  if (!postalCode) throw Error('Please provide postalCode')

  const { code: countryCode } = country ?? {}
  if (!countryCode) throw Error('Please provide countryCode')

  return {
    amount: amount.toString(),
    currencyCode,
    shippingAddressRequired: false,
    email: cart?.email ?? '',
    phone: phone ?? '',
    givenName,
    surname,
    address: { streetAddress, extendedAddress, locality, postalCode, region, countryCode },
  }
}

/** It sets the selected payment method on the cart. */
export function PaymentMethodOptions(props: PaymentOptionsProps) {
  const localPaymentPromise = useBraintreeLocalPayment()

  const { code, step, child } = props
  const paymentType = child as StartPaymentOptions['paymentType']
  const { data: cartData } = useCartQuery(BraintreeLocalPaymentsCartDocument)
  const [lockState, lock, unlock] = useBraintreeCartLock()
  const { selectedMethod } = usePaymentMethodContext()

  useEffect(() => {
    if (lockState.locked && !lockState.justLocked) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const params = unlock({ payment_id: null })

      //     // eslint-disable-next-line @typescript-eslint/no-floating-promises
      //     ;(async () => {
      //       const localPayment = await localPaymentPromise
      //       if (localPayment.hasTokenizationParams()) {
      //         await localPayment.tokenize(({}) => {
      //           // do stuff;
      //         })
      //       }
      //     })()
    }
  }, [lockState.justLocked, lockState.locked, unlock])

  /**
   * In the this folder you'll also find a PaymentMethodOptionsNoop.graphql document that is
   * imported here and used as the basis for the form below.
   */
  const form = useFormGqlMutationCart(BraintreePaymentMethodOptionsDocument, {
    defaultValues: { code },
    onBeforeSubmit: async () => {
      if (!cartData?.cart?.id) throw Error('Cart id is missing')
      if (!paymentType) throw Error('Could not resolve payment type')
      if (!selectedMethod?.code) throw Error('Selected method not found')
      const options = validateAndBuildStartPaymentParams(cartData)

      await lock({ payment_id: null, method: selectedMethod?.code })

      const localPayment = await localPaymentPromise
      try {
        const paymentResult = await localPayment.startPayment({
          paymentType,
          ...options,
          fallback: {
            buttonText: 'Return to website',
            url: window.location.href,
          },
          onPaymentStart: async ({ paymentId }, next) => {
            await lock({ payment_id: paymentId, method: selectedMethod?.code })
            next()
          },
        })

        await localPayment.teardown()

        return {
          cartId: cartData?.cart?.id,
          deviceData: '',
          isTokenEnabler: false,
          nonce: paymentResult.nonce,
          code,
        }
      } catch (e) {
        if (isBraintreeError(e)) unlock({ payment_id: null })
        throw e
      }
    },
  })

  const { handleSubmit, register } = form
  const submit = handleSubmit(() => {})

  /** To use an external Pay button we register the current form to be handled there as well. */
  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })

  /** This is the form that the user can fill in. In this case we don't wat the user to fill in anything. */
  return (
    <form onSubmit={submit}>
      <input type='hidden' {...register('code')} />
    </form>
  )
}

type Partial = Omit<StartPaymentOptions, 'paymentType' | 'fallback'>
