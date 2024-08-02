import { googleEventNames } from './googleEventNames'

export type EventMapFunctionType = (
  eventName: (typeof googleEventNames)[number] | (string & Record<never, never>),
  eventData: {
    [key: string]: unknown
  },
) => void

export const sendEvent: EventMapFunctionType = (eventName, eventData) => {
  // This is a generic event handler and is plugins from google-analytics and google datalayer
}

export const useSendEvent = () => sendEvent
