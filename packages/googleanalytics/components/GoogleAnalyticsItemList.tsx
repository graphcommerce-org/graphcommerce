import { nonNullable, useMemoObject } from '@graphcommerce/next-ui'
import { useEventCallback } from '@mui/material'
import React, { useContext, useEffect, useMemo } from 'react'
import { ProductToGtagItemFragment } from '../events/productToGtagItem/ProductToGtagItem.gql'
import { GtagItem, productToGtagItem } from '../events/productToGtagItem/productToGtagItem'

export type UseGtagViewItemListProps<
  P extends ProductToGtagItemFragment = ProductToGtagItemFragment,
> = {
  title: string
  items?: (P | null | undefined)[] | null
  listId?: string
}

export type ViewItemList = {
  item_list_id: string
  item_list_name: string
  items: GtagItem[]
}

const GoogleAnalyticsItemListContext = React.createContext<{
  item_list_id: string
  item_list_name: string
}>({ item_list_id: '', item_list_name: '' })

export function useGoogleAnalyticsListItemHandler(item: ProductToGtagItemFragment) {
  const { item_list_id, item_list_name } = useContext(GoogleAnalyticsItemListContext)
  return useEventCallback(() =>
    globalThis.gtag?.('event', 'select_item', {
      item_list_id,
      item_list_name,
      items: productToGtagItem(item),
    }),
  )
}

export function GoogleAnalyticsItemList<
  P extends ProductToGtagItemFragment = ProductToGtagItemFragment,
>(props: UseGtagViewItemListProps<P> & { children: React.ReactNode }) {
  const { title, items, listId, children } = props

  const eventData: ViewItemList = useMemoObject({
    item_list_id: listId ?? title?.toLowerCase().replace(/\s/g, '_'),
    item_list_name: title,
    items: items?.map((item) => (item ? productToGtagItem(item) : null)).filter(nonNullable) ?? [],
  })

  useEffect(() => globalThis.gtag?.('event', 'view_item_list', eventData), [eventData])

  const value = useMemo(
    () => ({
      item_list_id: listId ?? title?.toLowerCase().replace(/\s/g, '_'),
      item_list_name: title ?? listId,
    }),
    [listId, title],
  )

  return (
    <GoogleAnalyticsItemListContext.Provider value={value}>
      {children}
    </GoogleAnalyticsItemListContext.Provider>
  )
}
