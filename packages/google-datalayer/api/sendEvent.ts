export const googleEventNames = [
  'add_payment_info',
  'add_shipping_info',
  'add_to_cart',
  'add_to_wishlist',
  'begin_checkout',
  'checkout_progress',
  'earn_virtual_currency',
  'exception',
  'generate_lead',
  'join_group',
  'level_end',
  'level_start',
  'level_up',
  'login',
  'page_view',
  'post_score',
  'purchase',
  'refund',
  'remove_from_cart',
  'screen_view',
  'search',
  'select_content',
  'select_item',
  'select_promotion',
  'set_checkout_option',
  'share',
  'sign_up',
  'spend_virtual_currency',
  'tutorial_begin',
  'tutorial_complete',
  'unlock_achievement',
  'timing_complete',
  'view_cart',
  'view_item',
  'view_item_list',
  'view_promotion',
  'view_search_results',
] as const

export type EventMapFunctionType = (
  eventName: (typeof googleEventNames)[number] | (string & Record<never, never>),
  eventData: {
    [key: string]: unknown
  },
) => void

export const sendEvent: EventMapFunctionType = (eventName, eventData) => {
  // This is a generic event handler and is plugins from google-analytics and google datalayer
}
