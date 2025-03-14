import type {
  sendEvent,
  useSendEvent as useSendEventBase,
} from '@graphcommerce/google-datalayer/api/sendEvent'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { useEventCallback } from '@mui/material'

export const config: PluginConfig = {
  module: '@graphcommerce/google-datalayer',
  type: 'function',
}

export const useSendEvent: FunctionPlugin<typeof useSendEventBase> = (prev) => {
  const originalSendEvent = prev()

  return useEventCallback<typeof sendEvent>((eventName, eventData) => {
    originalSendEvent(eventName, eventData)
    globalThis.gtag('event', eventName, eventData)
  })
}
