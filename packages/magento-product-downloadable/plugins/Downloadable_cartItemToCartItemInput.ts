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
  if (!isTypename(product, ['DownloadableProduct'])) return result
  if (!isTypename(cartItem, ['DownloadableCartItem'])) return result

  const links = filterNonNullableKeys(cartItem.links, ['title', 'price'])
  const productLinks = filterNonNullableKeys(product.downloadable_product_links, ['title', 'price'])

  const downloadable: string[] = []

  productLinks.forEach((link) => {
    const linkIndex = links.findIndex((l) => l.uid === link.uid)
    if (linkIndex !== -1) downloadable.push(link.uid)
  })

  return { ...result, selected_options_record: { ...result.selected_options_record, downloadable } }
}
