import { GoogleEventTypes } from './googleEventNames'

export type SendEvent = (
  eventName: Event | (string & Record<never, never>),
  eventData: { [key: string]: unknown },
) => void

export function sendEvent<Event extends keyof GoogleEventTypes>(
  eventName: Event,
  eventData: GoogleEventTypes[Event],
) {
  // This is a generic event handler and is plugins from google-analytics and google datalayer
}

export function useSendEvent() {
  return <Event extends keyof GoogleEventTypes>(
    eventName: Event,
    eventData: GoogleEventTypes[Event],
  ) => sendEvent<Event>(eventName, eventData)
}
