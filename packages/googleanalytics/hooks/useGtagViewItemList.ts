import { ProductListItemFragment } from '@graphcommerce/magento-product'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { useEffect, useMemo } from 'react'
import { ViewItemList } from '../types/types'
import { itemToEvent } from '../utils'

export function useGtagViewItemList(
  item_list_name: string,
  items: (ProductListItemFragment | null | undefined)[] | null | undefined,
  item_list_id?: string,
) {
  const eventData: ViewItemList = useMemo(
    () => ({
      item_list_id: item_list_id ?? item_list_name?.toLowerCase().replace(/\s/g, '_'),
      item_list_name,
      items: filterNonNullableKeys(items, ['name', 'sku']).map((item) => itemToEvent(item)),
    }),
    [item_list_id, items, item_list_name],
  )

  useEffect(() => gtag?.('event', 'view_item_list', eventData), [eventData])
}
