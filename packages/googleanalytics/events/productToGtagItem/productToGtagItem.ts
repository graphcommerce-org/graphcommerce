import { ProductToGtagItemFragment } from './ProductToGtagItem.gql'

export type GtagItem = {
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

export function productToGtagItem<P extends ProductToGtagItemFragment>(item: P): GtagItem {
  return {
    item_id: item.sku ?? '',
    item_name: item.name ?? '',
    price: item.price_range?.minimum_price.final_price.value ?? undefined,
    currency: item.price_range?.minimum_price.final_price.currency ?? undefined,
    discount: item.price_range?.minimum_price.discount?.amount_off ?? undefined,
    item_category: item.categories?.[0]?.name ?? undefined,
    item_category2: item.categories?.[1]?.name ?? undefined,
    item_category3: item.categories?.[2]?.name ?? undefined,
    item_category4: item.categories?.[3]?.name ?? undefined,
    item_category5: item.categories?.[4]?.name ?? undefined,
  }
}
