import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { ProductPageItemFragment } from '../../Api/ProductPageItem.gql'

export function productPageMatchers<T extends ProductPageItemFragment>(product: T) {
  const matchers: string[] = []

  const skip = ['__typename', 'uid', 'name', 'url_key', 'weight', 'review_count', 'rating_summary']
  Object.entries(product).forEach(([key, value]) => {
    if (skip.includes(key) || !value) return
    if (typeof value !== 'string' && typeof value !== 'number') return
    if (typeof value === 'string' && value.includes(' ')) return

    matchers.push(`${key}=${value}`.toLowerCase())
  })

  return [
    ...matchers,
    ...filterNonNullableKeys(product.categories).map((c) => `category=${c.url_path}`),
    `url=p/${product.url_key}`,
  ]
}
