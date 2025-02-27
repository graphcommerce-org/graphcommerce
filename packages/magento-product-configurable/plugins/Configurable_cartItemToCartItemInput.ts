import { type cartItemToCartItemInput as cartItemToCartItemInputType } from '@graphcommerce/magento-cart-items'
import type { FunctionPlugin, PluginConfig } from '@graphcommerce/next-config'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'

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
  if (product.__typename !== 'ConfigurableProduct') return result
  if (cartItem.__typename !== 'ConfigurableCartItem') return result

  return {
    ...result,
    selected_options: [
      ...filterNonNullableKeys(cartItem.configurable_options).map(
        (option) => option.configurable_product_option_value_uid,
      ),
      ...(result?.selected_options ?? []),
    ],
  }
}
