import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { Item, ProductItem } from '../types/types'

export function itemToEvent(item: ProductItem): Item {
  const categories = filterNonNullableKeys(item.categories, ['include_in_menu', 'name'])

  return {
    item_name: item.name,
    item_id: item.sku,
    price: item.price_range?.minimum_price.final_price.value ?? undefined,
    currency: item.price_range?.minimum_price.final_price.currency ?? undefined,
    discount: item.price_range?.minimum_price.discount?.amount_off ?? undefined,
    item_category: categories[0]?.name,
    item_category2: categories[1]?.name,
    item_category3: categories[2]?.name,
    item_category4: categories[3]?.name,
    item_category5: categories[4]?.name,
  }
}
