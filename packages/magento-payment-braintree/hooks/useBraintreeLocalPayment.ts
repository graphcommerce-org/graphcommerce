import braintree from 'braintree-web'
import { useRef } from 'react'
import type { StartPaymentOptions } from './useBraintree'
import { useBraintreeClient } from './useBraintree'

type StartPaymentPayload = {
  nonce: string
  correlationId: string
  details: Record<string, unknown>
  type: string
}

type LocalPayment = {
  closeWindow(): void
  focusWindow(): void
  hasTokenizationParams(): boolean
  startPayment(options: StartPaymentOptions): Promise<StartPaymentPayload>
  teardown(): Promise<void>
  tokenize(params: {
    btLpToken: string
    btLpPaymentId: string
    btLpPayerId: string
  }): Promise<StartPaymentPayload>
}

let localPaymentPromise: Promise<LocalPayment> | undefined
function getLocalPaymentPromise(braintreePromise: ReturnType<typeof useBraintreeClient>) {
  if (!localPaymentPromise) {
    localPaymentPromise = new Promise((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      ;(async () => {
        try {
          const client = await braintreePromise

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore https://github.com/braintree/braintree-web/issues/552
          resolve(await braintree.localPayment.create({ client, debug: true }))
        } catch (e) {
          reject(e)
        }
      })()
    })
  }

  return localPaymentPromise
}

export function useBraintreeLocalPayment() {
  const braintreePromise = useBraintreeClient()
  return useRef<Promise<LocalPayment>>(getLocalPaymentPromise(braintreePromise)).current
}
