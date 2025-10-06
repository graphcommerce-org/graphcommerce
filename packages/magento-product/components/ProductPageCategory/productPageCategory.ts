import type { ProductPageCategoryFragment } from './ProductPageCategory.gql'

/**
 * Get the most siginifcant category a product is in.
 *
 * - Prefers categories that are included in the menu
 * - Prefers categories that have a longer path than shorter ones.
 */
export function productPageCategory<Product extends ProductPageCategoryFragment>(
  product?: Product | null,
): NonNullable<Product['categories']>[number] | undefined {
  if (!product?.categories?.length) return undefined
  return product?.categories?.reduce((carry, value) => {
    if (!value?.include_in_menu) return carry
    const carryL = carry?.url_path?.split('/')?.length ?? 0
    const valueL = value?.url_path?.split('/')?.length ?? 0
    return carryL >= valueL ? carry : value
  }, null)
}
