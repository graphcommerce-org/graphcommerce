import type { sendEvent as sendEventType } from '@graphcommerce/google-datalayer/api/sendEvent'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/google-datalayer',
  ifConfig: 'googleAnalyticsId',
}

export const sendEvent: FunctionPlugin<typeof sendEventType> = (prev, eventName, eventData) => {
  prev(eventName, eventData)
  globalThis.gtag('event', eventName, eventData)
}
