import { googleEventNames, type sendEvent as sendEventType } from '@graphcommerce/google-datalayer'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/google-datalayer',
  ifConfig: 'googleTagmanagerId',
}

declare global {
  interface Window {
    dataLayer?: object[]
  }
}

const ecommerceEvents = new RegExp(`${googleEventNames.join('|')}`, 'i')

export const sendEvent: FunctionPlugin<typeof sendEventType> = (prev, eventName, eventData) => {
  prev(eventName, eventData)

  if (ecommerceEvents.test(eventName)) {
    window.dataLayer?.push({ ecommerce: null })
    // console.log(eventName, eventData)
    window.dataLayer?.push({ event: eventName, ecommerce: eventData })
  } else {
    window.dataLayer?.push({ event: eventName, ...eventData })
  }
}
