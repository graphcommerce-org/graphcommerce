import { useMutation } from '@apollo/client'
import braintree, { Client } from 'braintree-web'
import { useEffect, useState } from 'react'
import { UseBraintreeDocument } from './UseBraintree.gql'

export type StartPaymentOptions = {
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

export default function useBraintree() {
  const [execute, { called, data, error }] = useMutation(UseBraintreeDocument)
  const [client, setClient] = useState<Client>()
  const authorization = data?.createBraintreeClientToken

  // Log errors if they are there
  useEffect(() => error && console.error(error), [error])

  // Create a token, maybe store it somewhere?
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (!called) execute()
  }, [called, execute])

  useEffect(() => {
    if (!authorization) return // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      try {
        setClient(await braintree.client.create({ authorization }))

        // // @ts-expect-error https://github.com/braintree/braintree-web/issues/552
        // const res = await braintree.localPayment.create({ client, debug: true })
        // setLocalPayment(res)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [authorization])

  return client
}
