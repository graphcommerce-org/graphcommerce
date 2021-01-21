import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import { ClientCartDocument } from '@reachdigital/magento-cart/ClientCart.gql'
import { AvailablePaymentMethodFragment } from '@reachdigital/magento-cart/payment-method/AvailablePaymentMethod.gql'
import { CartPaymentMethodsFragment } from '@reachdigital/magento-cart/payment-method/CartPaymentMethods.gql'
import braintree from 'braintree-web'
import { useCallback, useEffect, useState } from 'react'
import { BraintreeClientTokenDocument } from './BraintreeClientToken.gql'

type StartPaymentOptions = {
  fallback: {
    buttonText: string
    url: string
  }
  amount: string
  currencyCode: string
  paymentType: 'bancontact' | 'eps' | 'giropay' | 'ideal' | 'sofort' | 'mybank' | 'p24'
  paymentTypeCountryCode?: 'AT' | 'BE' | 'DE' | 'IT' | 'NL' | 'ES' | 'GB'
  email?: string
  givenName?: string
  surname?: string
  phone?: string
  shippingAddressRequired?: boolean
  address?: {
    streetAddress: string
    extendedAddress: string
    locality: string
    region: string
    postalCode: string
    countryCode: string
  }
  onPaymentStart?(paymentData: { paymentId: string }, continueCallback: () => void): void
}

type StartPaymentPayload = {}

type LocalPayment = {
  closeWindow(): void
  focusWindow(): void
  hasTokenizationParams(): void
  startPayment(options: StartPaymentOptions): Promise<StartPaymentPayload>
  teardown(): Promise<void>
  tokenize(params: {
    btLpToken: string
    btLpPaymentId: string
    btLpPayerId: string
  }): Promise<StartPaymentPayload>
}

export async function availableMethods(
  methods: CartPaymentMethodsFragment['available_payment_methods'] = [],
) {
  return methods
}

export default function BraintreeLocalPayment() {
  const { data: cartData } = useQuery(ClientCartDocument)
  const [execute, { called, data, error }] = useMutation(BraintreeClientTokenDocument)
  const [localPayment, setLocalPayment] = useState<LocalPayment>()
  const authorization = data?.createBraintreeClientToken

  // Create a token, maybe store it somewhere?
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (!called) execute()
  }, [called, execute])

  useEffect(() => {
    if (!authorization) return // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      try {
        const client = await braintree.client.create({ authorization })

        // @ts-expect-error https://github.com/braintree/braintree-web/issues/552
        const res = (await braintree.localPayment.create({ client, debug: true })) as LocalPayment
        setLocalPayment(res)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [authorization])

  const onClick = useCallback(() => {
    if (!cartData || !localPayment) return

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    localPayment
      .startPayment({
        paymentType: 'ideal',
        amount: '10.00',
        fallback: {
          buttonText: 'Ga terug!!',
          url: 'wjpoosososo',
        },
        currencyCode: 'EUR',
        shippingAddressRequired: false,
        email: 'joe@getbraintree.com',
        phone: '5101231234',
        givenName: 'Joe',
        surname: 'Doe',
        address: {
          streetAddress: 'Oosterdoksstraat 110',
          extendedAddress: 'Apt. B',
          locality: 'DK Amsterdam',
          postalCode: '1011',
          region: 'NH',
          countryCode: 'NL',
        },
        onPaymentStart: (paymentData, start) => {
          console.log(paymentData)
          start()
        },
      })
      .then(console.log)
      .catch(console.error)
  }, [])

  return (
    <>
      {localPayment && (
        <button type='button' onClick={() => {}}>
          Start
        </button>
      )}
    </>
  )
}
