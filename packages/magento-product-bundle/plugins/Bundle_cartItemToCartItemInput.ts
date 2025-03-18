import type { CartItemInput } from '@graphcommerce/graphql-mesh'
import { type cartItemToCartItemInput as cartItemToCartItemInputType } from '@graphcommerce/magento-cart-items'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { filterNonNullableKeys, isTypename } from '@graphcommerce/next-ui'

export const config: PluginConfig = {
  type: 'function',
  module: '@graphcommerce/magento-cart-items',
}

export const cartItemToCartItemInput: FunctionPlugin<typeof cartItemToCartItemInputType> = (
  prev,
  props,
) => {
  const result = prev(props)
  const { product, cartItem } = props

  if (!result) return result
  if (!isTypename(product, ['BundleProduct'])) return result
  if (!isTypename(cartItem, ['BundleCartItem'])) return result

  const links = filterNonNullableKeys(cartItem.links, ['title', 'price'])
  const productLinks = filterNonNullableKeys(product.downloadable_product_links, ['title', 'price'])

  const selected_options: NonNullable<CartItemInput['selected_options']> = []

  productLinks.forEach((link) => {
    const linkIndex = links.findIndex((l) => l.uid === link.uid)
    if (linkIndex !== -1) selected_options[linkIndex] = link.uid
  })

  return {
    ...result,
    selected_options,
  } satisfies CartItemInput
}
