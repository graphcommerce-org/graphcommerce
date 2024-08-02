import type {
  SendEvent,
  useSendEvent as useSendEventBase,
} from '@graphcommerce/google-datalayer/api/sendEvent'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { useCallback } from 'react'
import { useSendAlgoliaEvent } from '../hooks/useSendAlgoliaEvent'

export const config: PluginConfig = {
  module: '@graphcommerce/google-datalayer',
  type: 'function',
}

export const useSendEvent: FunctionPlugin<typeof useSendEventBase> = (prev) => {
  const originalSendEvent = prev()

  const sendAlgoliaEvent = useSendAlgoliaEvent()

  return useCallback<SendEvent>(
    (eventName, eventData) => {
      originalSendEvent(eventName, eventData)
      sendAlgoliaEvent(eventName, eventData)
    },
    [originalSendEvent, sendAlgoliaEvent],
  )
}
