import type { ApolloClient } from '@graphcommerce/graphql'
import { useApolloClient } from '@graphcommerce/graphql'
import type { Client } from 'braintree-web'
import braintree from 'braintree-web'
import { useRef } from 'react'
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

let clientPromise: Promise<Client> | undefined
function getClientPromise(apolloClient: ApolloClient<unknown>) {
  if (!clientPromise) {
    clientPromise = new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      ;(async () => {
        const res = await apolloClient.mutate({ mutation: UseBraintreeDocument })

        const authorization = res.data?.createBraintreeClientToken
        if (!authorization || res.errors?.[0]) {
          reject(res.errors?.[0])
          return
        }

        try {
          const clientInstance = await braintree.client.create({ authorization })
          resolve(clientInstance)
        } catch (e) {
          reject(e)
        }
      })()
    })
  }
  return clientPromise
}

export function useBraintreeClient(): Promise<Client> {
  const apolloClient = useApolloClient()
  return useRef<Promise<Client>>(getClientPromise(apolloClient)).current
}
