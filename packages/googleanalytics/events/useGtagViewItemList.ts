import { ProductListItemFragment } from '@graphcommerce/magento-product'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { useEffect, useMemo } from 'react'
import { ViewItemList } from '../types/types'
import { itemToEvent } from '../utils'

export type UseGtagViewItemListProps = {
  title: string
  items?: (ProductListItemFragment | null | undefined)[] | null | undefined
  listId?: string
}

export function useGtagViewItemList({ title, items, listId }: UseGtagViewItemListProps) {
  const eventData: ViewItemList = useMemo(
    () => ({
      item_list_id: listId ?? title?.toLowerCase().replace(/\s/g, '_'),
      item_list_name: title,
      items: filterNonNullableKeys(items, ['name', 'sku']).map((item) => itemToEvent(item)),
    }),
    [listId, items, title],
  )

  useEffect(() => gtag?.('event', 'view_item_list', eventData), [eventData])
}
