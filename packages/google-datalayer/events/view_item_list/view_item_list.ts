import { event } from '../../lib/event'

export const viewItemList = (itemListId: string, itemListName: string, items: unknown[]) =>
  event('view_item_list', {
    item_list_id: itemListId,
    item_list_name: itemListName,
    items,
  })
