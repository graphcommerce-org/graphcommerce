import {
  SelectedCustomizableOptions,
  CartItemActionCardProps,
} from '@graphcommerce/magento-cart-items'
import type { PluginProps } from '@graphcommerce/next-config'
import { isTypename } from '@graphcommerce/next-ui'

export const component = 'CartItemActionCard'
export const exported = '@graphcommerce/magento-cart-items'

export function VirtualCartItemActionCard(props: PluginProps<CartItemActionCardProps>) {
  const { Prev, ...rest } = props

  if (!isTypename(rest.cartItem, ['VirtualCartItem'])) return <Prev {...rest} />

  return (
    <Prev
      {...rest}
      details={
        <>
          {rest.details}
          <SelectedCustomizableOptions {...rest.cartItem} />
        </>
      }
    />
  )
}

export const Plugin = VirtualCartItemActionCard
