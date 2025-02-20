import {
  selectedCustomizableOptionsModifiers,
  type CartItemActionCardProps,
} from '@graphcommerce/magento-cart-items'
import type { PriceModifier } from '@graphcommerce/magento-cart-items/components/CartItemActionCard/PriceModifications'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-cart-items',
}

export function CartItemActionCard(props: PluginProps<CartItemActionCardProps>) {
  const { Prev, ...rest } = props

  if (rest.cartItem.__typename !== 'BundleCartItem') return <Prev {...rest} />

  const bundleModifiers = filterNonNullableKeys(rest.cartItem.bundle_options).map<PriceModifier>(
    (option) => ({
      key: option.uid,
      label: option.label,
      items: filterNonNullableKeys(option.values).map((value) => ({
        key: value.uid,
        label: value.label,
        amount: value.price,
        quantity: value.quantity,
      })),
    }),
  )

  return (
    <Prev
      {...rest}
      priceModifiers={[
        ...(rest.priceModifiers ?? []),
        ...bundleModifiers,
        ...selectedCustomizableOptionsModifiers(rest.cartItem),
      ]}
    />
  )
}
