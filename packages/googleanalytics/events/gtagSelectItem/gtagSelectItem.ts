import { ProductToGtagItemFragment } from '../productToGtagItem/ProductToGtagItem.gql'
import { productToGtagItem } from '../productToGtagItem/productToGtagItem'

type GtagSelectItemProps<T extends ProductToGtagItemFragment> = {
  item: T
  listId?: string
  title?: string
}

export function gtagSelectItem<T extends ProductToGtagItemFragment>(props: GtagSelectItemProps<T>) {
  const { item, listId: item_list_id, title: item_list_name } = props
  globalThis.gtag?.('event', 'select_item', {
    item_list_id,
    item_list_name,
    items: productToGtagItem(item),
  })
}
