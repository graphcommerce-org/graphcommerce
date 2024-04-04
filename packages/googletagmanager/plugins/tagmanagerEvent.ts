import { event, googleEventNames } from '@graphcommerce/google-datalayer/events/event'
import type { IfConfig, MethodPlugin } from '@graphcommerce/next-config'

export const func = 'sendEvent'
export const exported = '@graphcommerce/google-datalayer/api/sendEvent'
export const ifConfig: IfConfig = 'googleTagmanagerId'

declare global {
  interface Window {
    dataLayer?: object[]
  }
}

const ecommerceEvents = new RegExp(`${googleEventNames.join('|')}`, 'i')

const tagmanagerEvent: MethodPlugin<typeof event> = (prev, eventName, eventData) => {
  prev(eventName, eventData)

  if (ecommerceEvents.test(eventName)) {
    window.dataLayer?.push({ ecommerce: null })
    // console.log(eventName, eventData)
    window.dataLayer?.push({ event: eventName, ecommerce: eventData })
  } else {
    window.dataLayer?.push({ event: eventName, ...eventData })
  }
}

export const plugin = tagmanagerEvent
