import { ProductInterface } from '@graphcommerce/graphql-mesh'
import { itemToEvent } from '../utils'

type GtagSelectItemProps = {
  item: Partial<ProductInterface>
  listId?: string
  title?: string
}

export function gtagSelectItem({ item, listId, title }: GtagSelectItemProps) {
  gtag?.('event', 'select_item', {
    item_list_id: listId,
    item_list_name: title,
    items: itemToEvent({
      ...item,
      name: item.name ?? '',
      sku: item.sku ?? '',
    }),
  })
}
