import { Metric } from 'web-vitals'
import type { AddPaymentInfo } from '../mapping/cartToAddPaymentInfo/cartToAddPaymentInfo'
import type { AddShippingInfo } from '../mapping/cartToAddShippingInfo/cartToAddShippingInfo'
import type { BeginCheckout } from '../mapping/cartToBeginCheckout/cartToBeginCheckout'
import type { PurchaseOrRefund } from '../mapping/cartToPurchase/cartToPurchase'
import type { ViewCart } from '../mapping/cartToViewCart/cartToViewCart'
import type { DataLayerCurrencyValue } from '../mapping/datalayerItemsToCurrencyValue/datalayerItemsToCurrencyValue'
import type {
  SelectItem,
  ViewItemList,
} from '../mapping/productItemsToViewItemList/productItemsToViewItemList'
import type { GoogleDatalayerItem } from '../mapping/productToDatalayerItem/productToDatalayerItem'
import type { ViewItem } from '../mapping/productToViewItem/productToViewItem'

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

/**
 * @see https://developers.google.com/tag-platform/gtagjs/reference/events
 */
export type GoogleEventTypes = {
  exception: { description?: string; fatal?: boolean }
  share: { method?: string; content_type?: string; item_id?: string }

  add_payment_info: AddPaymentInfo
  add_shipping_info: AddShippingInfo
  add_to_cart: ViewCart
  add_to_wishlist: DataLayerCurrencyValue & { items: GoogleDatalayerItem[] }
  begin_checkout: BeginCheckout

  login: { method?: string }
  sign_up: {
    method?: string
  }

  page_view: {
    page_location?: string
    client_id?: string
    language?: string
    page_encoding?: string
    page_title?: string
    user_agent?: string
  }

  purchase: PurchaseOrRefund
  refund: PurchaseOrRefund
  remove_from_cart: ViewCart

  select_content: {
    content_type?: string
    content_id?: string
    data?: object
  }
  select_item: SelectItem

  view_cart: ViewCart
  view_item: ViewItem
  view_item_list: ViewItemList

  search: { search_term?: string }
  view_search_results: { search_term?: string }

  view_promotion: {
    creative_name?: string
    creative_slot?: string
    promotion_id?: string
    promotion_name?: string
    items?: GoogleDatalayerItem[]
  }
  select_promotion: {
    creative_name?: string
    creative_slot?: string
    promotion_id?: string
    promotion_name?: string
    items?: GoogleDatalayerItem[]
  }

  // Tutorial
  tutorial_begin: object
  tutorial_complete: object

  // Gaming
  earn_virtual_currency: { value?: string; virtual_currency_name?: string }
  join_group: { group_id?: string }
  level_end: { level_name?: string; success?: boolean }
  level_start: { level_name?: string }
  level_up: { level?: number; character?: string }
  post_score: { score?: number; level?: number; character?: string }
  spend_virtual_currency: {
    value?: string
    virtual_currency_name?: string
    item_name?: string
  }
  unlock_achievement: { achievement_id: string }

  // Leads
  close_convert_lead: DataLayerCurrencyValue
  close_unconvert_lead: DataLayerCurrencyValue & { unconvert_lead_reason?: string }
  disqualify_lead: DataLayerCurrencyValue & { disqualified_lead_reason?: string }
  generate_lead: DataLayerCurrencyValue & { lead_source?: string }
  qualify_lead: DataLayerCurrencyValue
  working_lead: DataLayerCurrencyValue & { lead_status?: string }

  // Custom events
  add_to_cart_error: {
    userErrors?: string[]
    errors?: string[]
    variables?: object
  }

  // Core web vitals tracking.
  [key: `cwv_${string}`]: {
    value: Metric['delta']
    debug_target?: string
  } & {
    [K in keyof Metric as K extends string ? `metric_${K}` : never]?: Metric[K]
  }
}
