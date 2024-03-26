import { nonNullable, useMemoObject } from '@graphcommerce/next-ui'
import { useEventCallback } from '@mui/material'
import React, { useContext, useEffect, useMemo } from 'react'
import { Item, ProductToItemFragment, productToItem } from '../lib'
import { event } from '../lib/event'

export type UseViewItemListProps<P extends ProductToItemFragment = ProductToItemFragment> = {
  title: string
  items?: (P | null | undefined)[] | null
  listId?: string
}

export type ViewItemList = {
  item_list_id: string
  item_list_name: string
  items: Item[]
}

const GoogleTagManagerItemListContext = React.createContext<{
  item_list_id: string
  item_list_name: string
}>({ item_list_id: '', item_list_name: '' })

export function useListItemHandler(item: ProductToItemFragment) {
  const { item_list_id, item_list_name } = useContext(GoogleTagManagerItemListContext)
  return useEventCallback(() =>
    event('select_item', {
      item_list_id,
      item_list_name,
      items: productToItem(item),
    }),
  )
}

export function ItemList<P extends ProductToItemFragment = ProductToItemFragment>(
  props: UseViewItemListProps<P> & { children: React.ReactNode },
) {
  const { title, items, listId, children } = props

  const eventData: ViewItemList = useMemoObject({
    item_list_id: listId ?? title?.toLowerCase().replace(/\s/g, '_'),
    item_list_name: title,
    items: items?.map((item) => (item ? productToItem(item) : null)).filter(nonNullable) ?? [],
  })

  useEffect(() => {
    event('view_item_list', eventData)
  }, [eventData])

  const value = useMemo(
    () => ({
      item_list_id: listId ?? title?.toLowerCase().replace(/\s/g, '_'),
      item_list_name: title ?? listId,
    }),
    [listId, title],
  )

  return (
    <GoogleTagManagerItemListContext.Provider value={value}>
      {children}
    </GoogleTagManagerItemListContext.Provider>
  )
}
