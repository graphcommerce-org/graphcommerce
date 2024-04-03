import { event } from '../event'

export const selectItem = (itemListId: string, itemListName: string, items: unknown[]) =>
  event('select_item', {
    item_list_id: itemListId,
    item_list_name: itemListName,
    items,
  })
