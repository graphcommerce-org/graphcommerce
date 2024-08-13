import type {
  sendEvent,
  useSendEvent as useSendEventBase,
} from '@graphcommerce/google-datalayer/api/sendEvent'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { useEventCallback } from '@mui/material'
import { useSendAlgoliaEvent } from '../hooks/useSendAlgoliaEvent'

export const config: PluginConfig = {
  module: '@graphcommerce/google-datalayer',
  type: 'function',
  ifConfig: 'algolia.analyticsEnabled',
}

export const useSendEvent: FunctionPlugin<typeof useSendEventBase> = (prev) => {
  const originalSendEvent = prev()
  const sendAlgoliaEvent = useSendAlgoliaEvent()

  return useEventCallback<typeof sendEvent>((eventName, eventData) => {
    originalSendEvent(eventName, eventData)
    sendAlgoliaEvent(eventName, eventData)
  })
}
