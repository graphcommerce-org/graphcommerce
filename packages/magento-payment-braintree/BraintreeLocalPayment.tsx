import { useQuery } from '@apollo/client'
import { ClientCartDocument } from '@reachdigital/magento-cart/ClientCart.gql'
import {
  PaymentMethodProps,
  ExpandPaymentMethods,
} from '@reachdigital/magento-cart/payment-method/CartPaymentMethods'
import Button from '@reachdigital/next-ui/Button'
import { useCallback } from 'react'
import { StartPaymentOptions } from './useBraintree'
import useBraintreeLocalPayment from './useBraintreeLocalPayment'

export default function BraintreeLocalPayment(props: PaymentMethodProps) {
  const localPayment = useBraintreeLocalPayment()
  const { child } = props
  const { data: cartData } = useQuery(ClientCartDocument)
  const paymentType = child as StartPaymentOptions['paymentType']

  const onClick = useCallback(() => {
    if (!cartData || !localPayment || !paymentType) return
    const address = cartData.cart?.shipping_addresses?.[0]

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      try {
        const result = await localPayment.startPayment({
          paymentType,
          amount: cartData.cart?.prices?.grand_total?.value?.toString() ?? '0.00',
          fallback: {
            buttonText: 'Ga terug!!',
            url: 'wjpoosososo',
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
            console.log(paymentId)
            next()
          },
        })
        console.log(result)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [cartData, localPayment, paymentType])

  return (
    <>
      {localPayment && (
        <button type='button' onClick={onClick}>
          Start
        </button>
      )}
    </>
  )
}

export function PayButton(props: PaymentMethodProps) {
  const { title } = props
  return <Button variant='pill'>Pay ({title})</Button>
}

/**
 * Local payment methods can be expanded to multiple separate methods
 * logic taken from https://developers.braintreepayments.com/guides/local-payment-methods/client-side-custom/javascript/v3#render-local-payment-method-buttons
 */
export const expandMethods: ExpandPaymentMethods = (available, cart) => {
  const address = cart?.shipping_addresses?.[0]
  const countryCode = address?.country.code
  const currency = cart?.prices?.grand_total?.currency
  const isEUR = currency === 'EUR'
  const isGB = currency === 'GBP' && countryCode === 'GB'
  const code = available.code ?? ''

  const methods: PaymentMethodProps[] = []
  if (countryCode === 'BE' && isEUR)
    methods.push({ child: 'bancontact', title: 'Bancontact', code })
  if (countryCode === 'AT' && isEUR) methods.push({ child: 'eps', title: 'EPS', code })
  if (countryCode === 'DE' && isEUR) methods.push({ child: 'giropay', title: 'giropay', code })
  if (countryCode === 'NL' && isEUR) methods.push({ child: 'ideal', title: 'iDEAL', code })
  if (['AT', 'BE', 'DE', 'IT', 'NL', 'ES', 'GB'].includes(countryCode ?? '') && (isEUR || isGB))
    methods.push({ child: 'sofort', title: 'Klarna Pay Now / SOFORT', code })
  if (countryCode === 'IT' && isEUR) methods.push({ child: 'mybank', title: 'MyBank', code })
  if (countryCode === 'PL' && (isEUR || currency === 'PLN'))
    methods.push({ child: 'p24', title: 'PL', code })

  return methods
}
