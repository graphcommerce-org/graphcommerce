import type { GoogleEventTypes } from '../api/googleEventNames'
import { sendEvent } from '../api/sendEvent'

export function useSendEvent() {
  return <Event extends keyof GoogleEventTypes>(
    eventName: Event,
    eventData: GoogleEventTypes[Event],
  ) => sendEvent<Event>(eventName, eventData)
}
