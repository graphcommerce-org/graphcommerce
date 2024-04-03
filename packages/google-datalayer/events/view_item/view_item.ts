import { event } from '../event'

export const viewItem = (itemListId: string, itemListName: string, items: unknown[]) =>
  event('view_item', {
    item_list_id: itemListId,
    item_list_name: itemListName,
    items,
  })
