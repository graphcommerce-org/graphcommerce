import { EventFormatSchema } from '@graphcommerce/next-config'

type EventMapFunctionType = (
  eventName: Gtag.EventNames | (string & Record<never, never>),
  eventData: {
    [key: string]: unknown
  },
) => void

type EventType = keyof (typeof EventFormatSchema)['Enum']

const eventMap: { [key in EventType]: EventMapFunctionType } = {
  GA4: (eventName, eventData) => {
    if (import.meta.graphCommerce.googleAnalyticsId) {
      globalThis.gtag('event', eventName, eventData)
    }

    if (import.meta.graphCommerce.googleTagmanagerId) {
      globalThis.dataLayer.push({ event: eventName, ...eventData })
    }
  },
  GA3: (eventName, eventData) => {
    if (import.meta.graphCommerce.googleAnalyticsId) {
      console.warn(
        "Google Analytics 3 format is not supported for Google Analytics 4. Please update your event format to 'GA4'.",
      )
    }

    if (import.meta.graphCommerce.googleTagmanagerId) {
      globalThis.dataLayer.push({ event: eventName, ecommerce: eventData })
    }
  },
}

const eventsToBeFired = import.meta.graphCommerce.analytics?.eventFormat ?? ['GA4']

export const event: EventMapFunctionType = (eventName, eventData) => {
  eventsToBeFired.map((e) => eventMap[e](eventName, eventData))
}
