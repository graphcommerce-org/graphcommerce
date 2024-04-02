import { event } from '@graphcommerce/google-datalayer/lib/event'
import type { IfConfig, MethodPlugin } from '@graphcommerce/next-config'

export const func = 'event'
export const exported = '@graphcommerce/google-datalayer/lib/event'
export const ifConfig: IfConfig = 'googleAnalyticsId'

const gtagEvent: MethodPlugin<typeof event> = (prev, eventName, eventData) => {
  prev(eventName, eventData)
  globalThis.gtag('event', eventName, eventData)
}

export const plugin = gtagEvent
