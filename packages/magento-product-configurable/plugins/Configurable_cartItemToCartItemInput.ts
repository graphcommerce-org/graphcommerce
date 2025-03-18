import { type cartItemToCartItemInput as cartItemToCartItemInputType } from '@graphcommerce/magento-cart-items'
import type { AddProductsToCartFields } from '@graphcommerce/magento-product/components'
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

  const selected: AddProductsToCartFields['cartItems'][number]['selected_options_record'] = {}
  const entered: AddProductsToCartFields['cartItems'][number]['entered_options_record'] = {}

  const items = filterNonNullableKeys(product.items)

  filterNonNullableKeys(cartItem.bundle_options).forEach((option) => {
    const values = filterNonNullableKeys(option?.values)
    const productItem = items.find((item) => item.uid === option.uid)
    const type = toBundleOptionType(productItem?.type)

    const vals = values.map((v) => v.uid)
    selected[option.uid] = type === 'multi' || type === 'checkbox' ? vals : vals[0]

    values.forEach((v) => {
      const productOptions = filterNonNullableKeys(productItem?.options)
      const productOption = productOptions.find((o) => o.uid === v.uid)
      if (productOption?.can_change_quantity) entered[v.uid] = v.quantity
    })
  })

  return {
    ...result,
    selected_options_record: { ...result.selected_options_record, ...selected },
    entered_options_record: { ...result.entered_options_record, ...entered },
  }
}
