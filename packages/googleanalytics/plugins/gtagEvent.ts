import { sendEvent } from '@graphcommerce/google-datalayer/api/sendEvent'
import type { IfConfig, MethodPlugin } from '@graphcommerce/next-config'

export const func = 'sendEvent'
export const exported = '@graphcommerce/google-datalayer/api/sendEvent'
export const ifConfig: IfConfig = 'googleAnalyticsId'

const gtagEvent: MethodPlugin<typeof sendEvent> = (prev, eventName, eventData) => {
  prev(eventName, eventData)
  globalThis.gtag('event', eventName, eventData)
}

export const plugin = gtagEvent
