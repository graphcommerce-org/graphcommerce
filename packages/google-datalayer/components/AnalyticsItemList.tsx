import { nonNullable, useMemoObject } from '@graphcommerce/next-ui'
import { useEventCallback } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import { ProductToItemFragment } from '../events/ProductToItem.gql'
import { event } from '../events/event'
import { productToItem } from '../events/productToItem'

export const AnalyticsItemListContext = React.createContext<
  | {
      selectItem: (itemId: string) => void
    }
  | undefined
>(undefined)

export function AnalyticsItemList<P extends ProductToItemFragment = ProductToItemFragment>(props: {
  title: string
  items?: (P | null | undefined)[] | null
  listId?: string
  children: React.ReactNode
}) {
  const { title: item_list_name, items, listId, children } = props
  const item_list_id = listId ?? item_list_name?.toLowerCase().replace(/\s/g, '_')

  const eventData = useMemoObject({
    item_list_id,
    item_list_name,
    items: items?.filter(nonNullable)?.map((item) => productToItem(item)) ?? [],
  })

  useEffect(() => event('view_item_list', eventData), [eventData])

  const selectItem = useEventCallback((itemId: string) => {
    event('select_item', {
      item_list_id,
      item_list_name,
      items: eventData.items.filter((item) => item.item_id === itemId),
    })
  })

  const value = useMemo(() => ({ selectItem }), [selectItem])

  return (
    <AnalyticsItemListContext.Provider value={value}>{children}</AnalyticsItemListContext.Provider>
  )
}
