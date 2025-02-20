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
  const { Prev, priceModifiers = [], ...rest } = props

  if (
    rest.cartItem.__typename !== 'DownloadableCartItem' ||
    rest.cartItem.product.__typename !== 'DownloadableProduct'
  )
    return <Prev priceModifiers={priceModifiers} {...rest} />

  const downloadableModifier: PriceModifier = {
    key: 'downloadable',
    label: rest.cartItem.product.links_title,
    items: filterNonNullableKeys(rest.cartItem.links).map((link) => ({
      key: link.uid,
      label: link.title,
      amount: link.price,
    })),
  }

  return (
    <Prev
      {...rest}
      priceModifiers={[
        ...priceModifiers,
        downloadableModifier,
        ...selectedCustomizableOptionsModifiers(rest.cartItem),
      ]}
    />
  )
}
