import braintree from 'braintree-web'
import { useRef } from 'react'
import { StartPaymentOptions, useBraintreeClient } from './useBraintree'

type StartPaymentPayload = {
  nonce: string
  correlationId: string
  details: Record<string, unknown>
  type: string
}

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

export function useBraintreeLocalPayment() {
  const braintreePromise = useBraintreeClient()
  const localPayment = useRef<Promise<LocalPayment>>(
    new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      ;(async () => {
        try {
          const client = await braintreePromise

          // @ts-expect-error https://github.com/braintree/braintree-web/issues/552
          resolve(await braintree.localPayment.create({ client, debug: true }))
        } catch (e) {
          reject(e)
        }
      })()
    }),
  )

  return localPayment.current
}
