import { productPageCategory } from '@graphcommerce/magento-product'
import { nonNullable } from '@graphcommerce/next-ui'
import { Product_DatalayerItemFragment } from './Product_DatalayerItem.gql'

export type GoogleDatalayerItem = {
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
  quantity: number
}

export function productToDatalayerItem<P extends Product_DatalayerItemFragment>(
  item: P,
): GoogleDatalayerItem {
  const category = productPageCategory(item)
  const item_categories = Object.fromEntries(
    [...(category?.breadcrumbs?.map((b) => b?.category_name) ?? []), category?.name]
      .filter(nonNullable)
      .map((name, index) => [`item_category${index > 0 ? index + 1 : ''}`, name]),
  )

  return {
    item_id: item.sku ?? '',
    item_name: item.name ?? '',
    price: item.price_range?.minimum_price.final_price.value ?? undefined,
    currency: item.price_range?.minimum_price.final_price.currency ?? undefined,
    discount: item.price_range?.minimum_price.discount?.amount_off ?? undefined,
    quantity: 1,
    ...item_categories,
  }
}
