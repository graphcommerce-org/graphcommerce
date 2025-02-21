import {
  selectedCustomizableOptionsModifiers,
  type CartItemActionCardProps,
} from '@graphcommerce/magento-cart-items'
import type { PriceModifier } from '@graphcommerce/magento-store'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { filterNonNullableKeys, isTypename } from '@graphcommerce/next-ui'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-cart-items',
}

export function CartItemActionCard(props: PluginProps<CartItemActionCardProps>) {
  const { Prev, ...rest } = props

  if (!isTypename(rest.cartItem, ['ConfigurableCartItem'])) return <Prev {...rest} />

  const configurableModifiers: PriceModifier[] = filterNonNullableKeys(
    rest.cartItem.configurable_options,
  ).map((option) => ({
    key: option.configurable_product_option_uid,
    label: option.option_label,
    items: [{ key: option.configurable_product_option_value_uid, label: option.value_label }],
  }))

  return (
    <Prev
      {...rest}
      cartItem={{
        ...rest.cartItem,
        product: {
          ...rest.cartItem.product,
          name: import.meta.graphCommerce.configurableVariantValues?.content
            ? rest.cartItem.configured_variant.name
            : rest.cartItem.product.name,
          thumbnail: rest.cartItem.configured_variant.thumbnail,
          // url_key: import.meta.graphCommerce.configurableVariantValues?.url
          //   ? rest.cartItem.configured_variant.url_key
          //   : rest.cartItem.product.url_key,
        },
      }}
      priceModifiers={[
        ...(rest.priceModifiers ?? []),
        ...configurableModifiers,
        ...selectedCustomizableOptionsModifiers(rest.cartItem),
      ]}
    />
  )
}
