import { useMutation } from '@apollo/client'
import {
  ExpandPaymentMethods,
  PaymentButtonProps,
  PaymentMethod,
  PaymentMethodOptionsNoop,
  PaymentMethodPlaceOrder,
  PaymentMethodPlaceOrderNoop,
  PaymentModule,
  PaymentOptionsProps,
  usePaymentMethodContext,
} from '@reachdigital/magento-cart-payment-method'
import { Button } from '@reachdigital/next-ui'
import { BraintreeError } from 'braintree-web'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import { BraintreePaymentMethodDocument } from './BraintreePaymentMethod.gql'
import { StartPaymentOptions } from './hooks/useBraintree'
import useBraintreeLocalPayment from './useBraintreeLocalPayment'

// function PaymentOptions(props: PaymentOptionsProps) {
//   return null
// }

// function PaymentButton(props: PaymentButtonProps) {
//   const { selectedMethod } = usePaymentMethodContext()
//   const localPayment = useBraintreeLocalPayment()

//   const [execute] = useMutation(BraintreePaymentMethodDocument)
//   const router = useRouter()

//   // When the payment method is initialized

//   // When the window was closed it will open a new window
//   // const { btLpToken, btLpPaymentId, btLpPayerId } = router.query as Record<string, string>
//   // useEffect(() => {
//   //   // eslint-disable-next-line @typescript-eslint/no-floating-promises
//   //   ;(async () => {
//   //     if (!cartData || !localPayment || !selectedMethod) return
//   //     if (!btLpToken || !btLpPaymentId || !btLpPayerId) return

//   //     const result = await localPayment.tokenize({ btLpToken, btLpPaymentId, btLpPayerId })
//   //     await execute({
//   //       variables: {
//   //         cartId: cartData.cart?.id as string,
//   //         deviceData: '',
//   //         isTokenEnabler: false,
//   //         nonce: result.nonce,
//   //         code: selectedMethod.code,
//   //       },
//   //     })
//   //     onPaymentComplete()
//   //   })()
//   // }, [
//   //   btLpPayerId,
//   //   btLpPaymentId,
//   //   btLpToken,
//   //   cartData,
//   //   execute,
//   //   localPayment,
//   //   onPaymentComplete,
//   //   selectedMethod,
//   // ])

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

//   return (
//     <Button {...buttonProps} onClick={onClick} loading={loading || !localPayment}>
//       {children} (<em>{title}</em>)
//     </Button>
//   )
// }

export default {
  PaymentOptions: PaymentMethodOptionsNoop,
  PaymentPlaceOrder: PaymentMethodPlaceOrderNoop,
  // PaymentButton,
  expandMethods,
} as PaymentModule
