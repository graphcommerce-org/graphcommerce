import { event } from '@graphcommerce/google-datalayer/lib/event'
import type { IfConfig, MethodPlugin } from '@graphcommerce/next-config'

export const func = 'event'
export const exported = '@graphcommerce/google-datalayer/lib/event'
export const ifConfig: IfConfig = 'googleTagmanagerId'

declare global {
  interface Window {
    dataLayer?: object[]
  }
}

const ecommerceEvents =
  /add_payment_info|add_shipping_info|add_to_cart|add_to_wishlist|begin_checkout|purchase|refund|remove_from_cart|select_item|select_promotion|view_cart|view_item|view_item_list|view_promotion/i

const tagmanagerEvent: MethodPlugin<typeof event> = (prev, eventName, eventData) => {
  prev(eventName, eventData)

  if (ecommerceEvents.test(eventName)) {
    window.dataLayer?.push({ ecommerce: null })
    window.dataLayer?.push({ event: eventName, ecommerce: eventData })
  } else {
    window.dataLayer?.push({ event: eventName, ...eventData })
  }
}

export const plugin = tagmanagerEvent
