import { EventFormatSchema } from '@graphcommerce/next-config'

type EventMapFunctionType = (
  eventName: string,
  eventData: {
    [key: string]: unknown
  },
) => void

type EventType = keyof (typeof EventFormatSchema)['Enum']

const eventMap: { [key in EventType]: EventMapFunctionType } = {
  GA4: (eventName, eventData) => globalThis.gtag('event', eventName, eventData),
  GA3: (eventName, eventData) =>
    globalThis.dataLayer.push({ event: eventName, ecommerce: eventData }),
}

export const event: EventMapFunctionType = (eventName, eventData) => {
  const eventsToBeFired = import.meta.graphCommerce.analytics?.eventFormat
  if (eventsToBeFired) eventsToBeFired.map((e) => eventMap[e](eventName, eventData))
}
