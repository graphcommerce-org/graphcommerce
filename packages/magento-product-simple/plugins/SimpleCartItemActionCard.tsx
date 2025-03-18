import type { CartItemActionCardProps } from '@graphcommerce/magento-cart-items'
import { selectedCustomizableOptionsModifiers } from '@graphcommerce/magento-cart-items'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { isTypename } from '@graphcommerce/next-ui'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-cart-items',
}

export function CartItemActionCard(props: PluginProps<CartItemActionCardProps>) {
  const { Prev, ...rest } = props

  if (!isTypename(rest.cartItem, ['SimpleCartItem'])) return <Prev {...rest} />

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
