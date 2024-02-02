import braintree, { HostedFields } from 'braintree-web'
import { useEffect, useState } from 'react'
import { useBraintreeClient } from './useBraintree'

let teardownPromise: Promise<void> | undefined | void

export function useBraintreeHostedFields() {
  const braintreePromise = useBraintreeClient()
  const [hostedFields, setHostedFields] = useState<HostedFields | undefined>(undefined)

  useEffect(() => {
    if (!hostedFields) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      braintreePromise.then(async (client) => {
        if (teardownPromise) {
          await teardownPromise
          teardownPromise = undefined
        }
        const hosted = await braintree.hostedFields.create({
          client,
          styles: {
            input: {
              // change input styles to match
              // bootstrap styles
              'font-size': '1rem',
              color: '#495057',
              'padding-left': '16px',
              'padding-right': '16px',
            },
          },
          fields: {
            number: { container: '#card-number' },
            cvv: { container: '#cvv' },
            expirationDate: { container: '#expiration-date' },
            // cardholderName: { container: '#cardholder-name' },
            // postalCode: { container: '#postal-code' },
          },
        })

        setHostedFields(hosted)
      })
    }

    return () => {
      teardownPromise = hostedFields?.teardown()
    }
  }, [])

  return teardownPromise ? undefined : hostedFields
}
