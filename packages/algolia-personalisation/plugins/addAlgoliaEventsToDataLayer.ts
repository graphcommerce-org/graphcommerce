import { sendEvent as sendEventBase } from '@graphcommerce/google-datalayer/api/sendEvent'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import prepareAddToCartEvent from '../utils/prepareAddToCartEvent'

export const config: PluginConfig = {
  module: '@graphcommerce/google-datalayer/api/sendEvent',
  type: 'function',
}

const googleToAlgoliaEventCall = {
  add_to_cart: prepareAddToCartEvent,
}
export const sendEvent: FunctionPlugin<typeof sendEventBase> = (prev, eventName, eventData) => {
  console.log('check', eventName, eventData)
  if (googleToAlgoliaEventCall[eventName]) {
    googleToAlgoliaEventCall[eventName](eventData)
  } else {
    console.log('Event function not found.. skipping')
  }
  return prev(eventName, eventData)
}
