import { sendEvent as sendEventBase } from '@graphcommerce/google-datalayer/api/sendEvent'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import prepareAddToCartEvent from '../utils/prepareAddToCartEvent'
import prepareViewObjectEvent from '../utils/prepareViewObjectEvent'
import preparePurchaseEvent from '../utils/preparePurchaseEvent'

export const config: PluginConfig = {
  module: '@graphcommerce/google-datalayer/api/sendEvent',
  type: 'function',
}

const googleToAlgoliaEventCall = {
  add_to_cart: prepareAddToCartEvent,
  view_item: prepareViewObjectEvent,
  purchase: preparePurchaseEvent,
}
export const sendEvent: FunctionPlugin<typeof sendEventBase> = (prev, eventName, eventData) => {
  console.log('check', eventData)
  if (googleToAlgoliaEventCall[eventName]) {
    //TODO Send event to algolia
    googleToAlgoliaEventCall[eventName](eventData)
  } else {
    console.log('Event function not found.. skipping')
  }
  return prev(eventName, eventData)
}
