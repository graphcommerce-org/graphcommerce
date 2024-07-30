import { sendEvent as sendEventBase } from '@graphcommerce/google-datalayer/api/sendEvent'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  module: '@graphcommerce/google-datalayer/api/sendEvent',
  type: 'function',
}
export const sendEvent: FunctionPlugin<typeof sendEventBase> = (prev, eventName, eventData) => {}
