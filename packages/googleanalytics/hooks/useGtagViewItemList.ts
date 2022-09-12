import type { ProductInterface } from '@graphcommerce/graphql-mesh'
import { ProductListItemFragment, productPageCategory } from '@graphcommerce/magento-product'
import { filterNonNullableKeys, RequiredKeys } from '@graphcommerce/next-ui'
import { useEffect, useMemo } from 'react'

type Item = {
  item_id: string
  item_name: string
  affiliation?: string
  coupon?: string
  currency?: string
  discount?: number
  index?: number
  item_brand?: string
  item_category?: string
  item_category2?: string
  item_category3?: string
  item_category4?: string
  item_category5?: string
  item_list_id?: string
  item_list_name?: string
  item_variant?: string
  location_id?: string
  price?: number
  quantity?: number
}
type ViewItemList = {
  item_list_id: string
  item_list_name: string
  items: Item[]
}

type ProductItem = RequiredKeys<Partial<ProductInterface>, 'name' | 'sku'>

function itemToEvent(item: ProductItem): Item {
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

export function useGtagViewItemList(
  item_list_name: string,
  items: (ProductListItemFragment | null | undefined)[] | null | undefined,
  item_list_id?: string,
) {
  const eventData: ViewItemList = useMemo(
    () => ({
      item_list_id: item_list_id ?? item_list_name?.toLowerCase().replaceAll(' ', '_'),
      item_list_name,
      items: filterNonNullableKeys(items, ['name', 'sku']).map(itemToEvent),
    }),
    [item_list_id, items, item_list_name],
  )

  useEffect(() => gtag?.('event', 'view_item_list', eventData), [eventData])
}
