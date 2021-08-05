import braintree, { HostedFields } from 'braintree-web'
import { useRef } from 'react'
import { useBraintreeClient } from './useBraintree'

let hostedFieldsPromise: Promise<HostedFields> | undefined
function getLocalPaymentPromise(braintreePromise: ReturnType<typeof useBraintreeClient>) {
  if (!hostedFieldsPromise) {
    hostedFieldsPromise = new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      ;(async () => {
        try {
          const client = await braintreePromise

          resolve(
            await braintree.hostedFields.create({
              client,
              fields: {
                number: {
                  container: '#card-number',
                  // placeholder: '4111 1111 1111 1111',
                },
                cvv: {
                  container: '#cvv',
                  // placeholder: '123',
                },
                expirationDate: {
                  container: '#expiration-date',
                  // placeholder: '10/2022',
                },
              },
            }),
          )
        } catch (e) {
          reject(e)
        }
      })()
    })
  }

  return hostedFieldsPromise
}

export function useBraintreeHostedFields() {
  const braintreePromise = useBraintreeClient()
  return useRef<Promise<HostedFields>>(getLocalPaymentPromise(braintreePromise)).current
}
