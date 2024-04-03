import { event } from '@graphcommerce/google-datalayer/events/event'
import type { IfConfig, MethodPlugin } from '@graphcommerce/next-config'

export const func = 'event'
export const exported = '@graphcommerce/google-datalayer/events/event'
export const ifConfig: IfConfig = 'googleAnalyticsId'

const gtagEvent: MethodPlugin<typeof event> = (prev, eventName, eventData) => {
  prev(eventName, eventData)
  globalThis.gtag('event', eventName, eventData)
}

export const plugin = gtagEvent
