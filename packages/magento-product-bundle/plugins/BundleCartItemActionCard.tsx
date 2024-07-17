import { CartItemActionCardProps } from '@graphcommerce/magento-cart-items'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { isTypename } from '@graphcommerce/next-ui'
import { BundleProductCartItemOptions } from '../components/BundleProductCartItemOptions/BundleProductCartItemOptions'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-cart-items',
}

export function CartItemActionCard(props: PluginProps<CartItemActionCardProps>) {
  const { Prev, ...rest } = props

  if (!isTypename(rest.cartItem, ['BundleCartItem'])) return <Prev {...rest} />

  return (
    <Prev
      {...rest}
      details={
        <>
          {rest.details}
          <BundleProductCartItemOptions {...rest.cartItem} />
        </>
      }
    />
  )
}
