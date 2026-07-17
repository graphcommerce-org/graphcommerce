import { disableBraintreeThreeDSecure } from '@graphcommerce/next-config/config'
import { useStorefrontConfig } from '@graphcommerce/next-ui'
import type { HostedFields, ThreeDSecure } from 'braintree-web'
import braintree from 'braintree-web'
import { useEffect, useState } from 'react'
import { useBraintreeClient } from './useBraintree'

let teardownPromise: Promise<void> | undefined | void

export function useBraintreeHostedFields() {
  const braintreePromise = useBraintreeClient()
  const [hostedFields, setHostedFields] = useState<
    [HostedFields, ThreeDSecure | undefined] | [undefined, undefined]
  >([undefined, undefined])

  const isThreeDSecureDisabled =
    useStorefrontConfig().disableBraintreeThreeDSecure ?? disableBraintreeThreeDSecure

  useEffect(() => {
    if (!hostedFields[0] && !teardownPromise) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      braintreePromise.then(async (client) => {
        if (teardownPromise) {
          await teardownPromise
          teardownPromise = undefined
        }

        const threeDSecure = isThreeDSecureDisabled
          ? undefined
          : await braintree.threeDSecure.create({ client, version: 2 })

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

        setHostedFields([hosted, threeDSecure])
      })
    }

    return () => {
      teardownPromise = hostedFields[0]?.teardown()
      hostedFields[1]?.teardown()
    }
  }, [])

  return teardownPromise ? [undefined, undefined] : hostedFields
}
