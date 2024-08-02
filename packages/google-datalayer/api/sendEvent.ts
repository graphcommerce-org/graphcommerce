import type { DataLayerCurrencyValue } from '../mapping/datalayerItemsToCurrencyValue/datalayerItemsToCurrencyValue'
import type { GoogleDatalayerItem } from '../mapping/productToDatalayerItem/productToDatalayerItem'
import { googleEventNames } from './googleEventNames'

export type SendEvent = (
  eventName: (typeof googleEventNames)[number] | (string & Record<never, never>),
  eventData: {
    [key: string]: unknown
  },
) => void

export type ViewItemList = {
  item_list_id: string
  item_list_name: string
  items: GoogleDatalayerItem[]
}

export type SelectItem = {
  item_list_id: string
  item_list_name: string
  items: GoogleDatalayerItem[]
}

export type ViewItem = DataLayerCurrencyValue & {
  items: GoogleDatalayerItem[]
}

export const sendEvent: SendEvent = (eventName, eventData) => {
  // This is a generic event handler and is plugins from google-analytics and google datalayer
}

export const useSendEvent = () => sendEvent
