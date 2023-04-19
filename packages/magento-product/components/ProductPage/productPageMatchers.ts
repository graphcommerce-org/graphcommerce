import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { ProductPageItemFragment } from '../../Api/ProductPageItem.gql'

type Conditions = { property: string; value: string | number | bigint }[]

export async function productPageMatchers<T extends ProductPageItemFragment>(
  productPromise: Promise<T | null | undefined>,
) {
  const product = await productPromise
  if (!product) return []

  const conditions: Conditions = []

  const skip = ['__typename', 'uid', 'name', 'url_key']
  Object.entries(product).forEach(([property, value]) => {
    if (skip.includes(property) || !value) return

    if (typeof value === 'string' && !value.includes(' ')) {
      conditions.push({ property, value })
    }
    if (typeof value === 'number' || typeof value === 'bigint') {
      conditions.push({ property, value })
    }
  })

  const final_price = product.price_range.minimum_price.final_price.value
  const regular_price = product.price_range.minimum_price.regular_price.value
  if (final_price) conditions.push({ property: 'final_price', value: final_price })
  if (regular_price) conditions.push({ property: 'regular_price', value: regular_price })

  filterNonNullableKeys(product.categories).forEach((c) => {
    conditions.push({ property: 'category', value: c.url_path })
  })

  conditions.push({ property: 'url', value: `p/${product.url_key}` })
  return conditions
}
