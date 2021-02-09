import { useMutation, useQuery as braintree_local_payment } from '@apollo/client'
import { ClientCartDocument } from '@reachdigital/magento-cart/ClientCart.gql'
import {
  ExpandPaymentMethods,
  PaymentButtonProps,
  PaymentMethod,
  PaymentModule,
  PaymentOptionsProps,
} from '@reachdigital/magento-cart/payment-method/PaymentMethod'
import { usePaymentMethodContext } from '@reachdigital/magento-cart/payment-method/PaymentMethodContext'
import Button from '@reachdigital/next-ui/Button'
import { BraintreeError } from 'braintree-web'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect } from 'react'
import { BraintreePaymentMethodDocument } from './BraintreePaymentMethod.gql'
import { StartPaymentOptions } from './useBraintree'
import useBraintreeLocalPayment from './useBraintreeLocalPayment'

function PaymentOptions(props: PaymentOptionsProps) {
  return null
}

function PaymentButton(props: PaymentButtonProps) {
  const { loading, selectedMethod } = usePaymentMethodContext()
  const localPayment = useBraintreeLocalPayment()

  const {
    child,
    title,
    onPaymentComplete,
    onPaymentStart,
    onPaymentError,
    code,
    preferred,
    children,
    ...buttonProps
  } = props

  const { data: cartData } = braintree_local_payment(ClientCartDocument)
  const paymentType = child as StartPaymentOptions['paymentType']
  const [execute] = useMutation(BraintreePaymentMethodDocument)
  const router = useRouter()

  // When the payment method is initialized

  // When the window was closed it will open a new window
  // const { btLpToken, btLpPaymentId, btLpPayerId } = router.query as Record<string, string>
  // useEffect(() => {
  //   // eslint-disable-next-line @typescript-eslint/no-floating-promises
  //   ;(async () => {
  //     if (!cartData || !localPayment || !selectedMethod) return
  //     if (!btLpToken || !btLpPaymentId || !btLpPayerId) return

  //     const result = await localPayment.tokenize({ btLpToken, btLpPaymentId, btLpPayerId })
  //     await execute({
  //       variables: {
  //         cartId: cartData.cart?.id as string,
  //         deviceData: '',
  //         isTokenEnabler: false,
  //         nonce: result.nonce,
  //         code: selectedMethod.code,
  //       },
  //     })
  //     onPaymentComplete()
  //   })()
  // }, [
  //   btLpPayerId,
  //   btLpPaymentId,
  //   btLpToken,
  //   cartData,
  //   execute,
  //   localPayment,
  //   onPaymentComplete,
  //   selectedMethod,
  // ])

  const onClick = useCallback(() => {
    if (!cartData || !localPayment || !paymentType || !selectedMethod) return
    const address = cartData.cart?.shipping_addresses?.[0]

    onPaymentStart()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      try {
        const result = await localPayment.startPayment({
          paymentType,
          amount: cartData.cart?.prices?.grand_total?.value?.toString() ?? '0.00',
          fallback: {
            buttonText: 'Return to website',
            url: 'http://localhost:3000/checkout/payment',
          },
          currencyCode: cartData.cart?.prices?.grand_total?.currency ?? 'EUR',
          shippingAddressRequired: false,
          email: cartData?.cart?.email ?? '',
          phone: address?.telephone ?? '',
          givenName: address?.firstname ?? '',
          surname: address?.lastname ?? '',
          address: {
            streetAddress: address?.street[0] ?? '',
            extendedAddress: address?.street.slice(1).join('\n') ?? '',
            locality: address?.city ?? '',
            postalCode: address?.postcode ?? '',
            region: address?.region?.code ?? '',
            countryCode: address?.country.code ?? '',
          },
          onPaymentStart: ({ paymentId }, next) => {
            // todo what should we do with the payment id?
            console.log(paymentId)
            next()
          },
        })

        await execute({
          variables: {
            cartId: cartData.cart?.id as string,
            deviceData: '',
            isTokenEnabler: false,
            nonce: result.nonce,
            code: selectedMethod.code,
          },
        })
        onPaymentComplete()
      } catch (e) {
        if (e.name === 'BraintreeError') {
          const error = e as BraintreeError
          if (error.type === 'CUSTOMER') {
            onPaymentError({ message: <>Payment cancelled, please try again</>, severity: 'info' })
          } else {
            onPaymentError({ message: error.message, severity: 'error' })
          }
        }
      }
    })()
  }, [
    cartData,
    execute,
    localPayment,
    onPaymentComplete,
    onPaymentError,
    onPaymentStart,
    paymentType,
    selectedMethod,
  ])

  return (
    <Button {...buttonProps} onClick={onClick} loading={loading || !localPayment}>
      {children} (<em>{title}</em>)
    </Button>
  )
}

/**
 * Local payment methods can be expanded to multiple separate methods
 * logic taken from https://developers.braintreepayments.com/guides/local-payment-methods/client-side-custom/javascript/v3#render-local-payment-method-buttons
 */
const expandMethods: ExpandPaymentMethods = (available, cart) => {
  const address = cart?.shipping_addresses?.[0]
  const countryCode = address?.country.code
  const currency = cart?.prices?.grand_total?.currency
  const isEUR = currency === 'EUR'
  const isGB = currency === 'GBP' && countryCode === 'GB'
  const code = available.code ?? ''

  const methods: PaymentMethod[] = []

  if (countryCode === 'BE' && isEUR) {
    methods.push({ child: 'bancontact', title: 'Bancontact', code, preferred: true })
  }
  if (countryCode === 'AT' && isEUR) {
    methods.push({ child: 'eps', title: 'EPS', code })
  }

  if (countryCode === 'DE' && isEUR) {
    methods.push({ child: 'giropay', title: 'giropay', code })
  }

  if (countryCode === 'NL' && isEUR) {
    methods.push({ child: 'ideal', title: 'iDEAL', code, preferred: true })
  }

  if (['AT', 'BE', 'DE', 'IT', 'NL', 'ES', 'GB'].includes(countryCode ?? '') && (isEUR || isGB)) {
    methods.push({ child: 'sofort', title: 'Klarna Pay Now / SOFORT', code })
  }

  if (countryCode === 'IT' && isEUR) {
    methods.push({ child: 'mybank', title: 'MyBank', code })
  }

  if (countryCode === 'PL' && (isEUR || currency === 'PLN')) {
    methods.push({ child: 'p24', title: 'PL', code })
  }

  return methods
}

export default {
  PaymentOptions,
  PaymentButton,
  expandMethods,
} as PaymentModule
