import { nonNullable, useMemoDeep } from '@graphcommerce/next-ui'
import { useEffect } from 'react'
import { ProductToGtagItemFragment } from '../productToGtagItem/ProductToGtagItem.gql'
import { GtagItem, productToGtagItem } from '../productToGtagItem/productToGtagItem'

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

export function useGtagViewItemList<P extends ProductToGtagItemFragment>(
  props: UseGtagViewItemListProps<P>,
) {
  const { title, items, listId } = props

  const eventData: ViewItemList = useMemoDeep(
    () => ({
      item_list_id: listId ?? title?.toLowerCase().replace(/\s/g, '_'),
      item_list_name: title,
      items:
        items?.map((item) => (item ? productToGtagItem(item) : null)).filter(nonNullable) ?? [],
    }),
    [listId, items, title],
  )

  useEffect(() => globalThis.gtag?.('event', 'view_item_list', eventData), [eventData])
}
