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

export const sendEvent: FunctionPlugin<typeof sendEventType> = (prev, eventName, eventData) => {
  prev(eventName, eventData)

  if (new RegExp(`${googleEventNames.join('|')}`, 'i').test(eventName)) {
    window.dataLayer?.push({ ecommerce: null })
    // console.log(eventName, eventData)
    window.dataLayer?.push({ event: eventName, ecommerce: eventData })
  } else {
    window.dataLayer?.push({ event: eventName, ...eventData })
  }
}
