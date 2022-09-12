import { ProductInterface } from '@graphcommerce/graphql-mesh'
import { itemToEvent } from '.'

export function gtagSelectItem(
  item: Partial<ProductInterface>,
  item_list_id?: string,
  item_list_name?: string,
) {
  gtag?.('event', 'select_item', {
    item_list_id,
    item_list_name,
    items: itemToEvent({
      ...item,
      name: item.name ?? '',
      sku: item.sku ?? '',
    }),
  })
}
