import braintree from 'braintree-web'
import { useState, useEffect } from 'react'
import useBraintree, { StartPaymentOptions } from './useBraintree'

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

export default function useBraintreeLocalPayment() {
  const [localPayment, setLocalPayment] = useState<LocalPayment>()
  const client = useBraintree()

  useEffect(() => {
    if (!client) return // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      try {
        setLocalPayment(
          // @ts-expect-error https://github.com/braintree/braintree-web/issues/552
          await braintree.localPayment.create({ client, debug: true }),
        )
      } catch (e) {
        console.error(e)
      }
    })()
  }, [client])

  return localPayment
}
