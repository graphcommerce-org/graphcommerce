export type EventMapFunctionType = (
  eventName: Gtag.EventNames | (string & Record<never, never>),
  eventData: {
    [key: string]: unknown
  },
) => void

export const event: EventMapFunctionType = (eventName, eventData) => {}
