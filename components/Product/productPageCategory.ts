/**
 * Get the most siginifcant category a product is in.
 * - Prefers categories that are included in the menu
 * - Prefers categoriese that have a longer path than shorter ones.
 */
export default function productPageCategory(product: GQLProductPageCategoryFragment) {
  return product?.categories?.reduce((carry, value) => {
    if (!carry?.include_in_menu && value?.include_in_menu) return value
    const carryL = carry?.url_path?.split('/')?.length ?? 0
    const valueL = value?.url_path?.split('/')?.length ?? 0
    return carryL >= valueL ? carry : value
  })
}
