import type { PayPalCheckout } from 'braintree-web'
import braintree from 'braintree-web'
import { useEffect, useState } from 'react'
import { useBraintreeClient } from './useBraintree'

let teardownPromise: Promise<void> | undefined | void

export function useBraintreePaypal() {
  const braintreePromise = useBraintreeClient()
  const [paypalCheckout, setPaypalCheckout] = useState<PayPalCheckout | undefined>(undefined)

  useEffect(() => {
    if (!paypalCheckout && !teardownPromise) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      braintreePromise.then(async (client) => {
        if (teardownPromise) {
          await teardownPromise
          teardownPromise = undefined
        }

        const checkout = await braintree.paypalCheckout.create({ client })

        const loaded = await checkout.loadPayPalSDK({
          debug: true,
          currency: 'EUR',
          locale: 'en-US',
          intent: 'capture',
          vault: false,
        })
        setPaypalCheckout(loaded)
      })
    }

    return () => {
      teardownPromise = paypalCheckout?.teardown()
    }
  }, [braintreePromise, paypalCheckout])

  return teardownPromise ? undefined : paypalCheckout
}
