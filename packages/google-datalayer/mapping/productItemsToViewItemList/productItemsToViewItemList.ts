import { ProductListItemFragment } from '@graphcommerce/magento-product'
import { nonNullable } from '@graphcommerce/next-ui'
import { productToDatalayerItem } from '../productToDatalayerItem/productToDatalayerItem'

export function productItemsToViewItemList<P extends ProductListItemFragment>(
  item_list_id: string,
  item_list_name: string,
  items: Array<P | null | undefined> | null | undefined,
) {
  return {
    item_list_id,
    item_list_name,
    items: items?.filter(nonNullable)?.map((item) => productToDatalayerItem(item)) ?? [],
  }
}

export function viewItemListToSelectItem(
  viewItemList: ReturnType<typeof productItemsToViewItemList>,
  itemId: string,
) {
  return { ...viewItemList, items: viewItemList.items.filter((i) => i.item_id === itemId) }
}
