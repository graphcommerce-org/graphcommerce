import type { CartItemActionCardProps } from '@graphcommerce/magento-cart-items'
import { selectedCustomizableOptionsModifiers } from '@graphcommerce/magento-cart-items'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-cart-items',
}

export function CartItemActionCard(props: PluginProps<CartItemActionCardProps>) {
  const { Prev, ...rest } = props

  if (rest.cartItem.__typename !== 'SimpleCartItem') return <Prev {...rest} />

  return (
    <Prev
      {...rest}
      priceModifiers={[
        ...(rest.priceModifiers ?? []),
        ...selectedCustomizableOptionsModifiers(rest.cartItem),
      ]}
    />
  )
}
