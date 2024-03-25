import {
  SelectedCustomizableOptions,
  type CartItemActionCard,
  CartItemActionCardProps,
} from '@graphcommerce/magento-cart-items'
import type { PluginProps } from '@graphcommerce/next-config'
import { isTypename } from '@graphcommerce/next-ui'

export const component = 'CartItemActionCard'
export const exported = '@graphcommerce/magento-cart-items'

export function SimpleCartItemActionCard(props: PluginProps<CartItemActionCardProps>) {
  const { Prev, ...rest } = props

  if (!isTypename(rest.cartItem, ['SimpleCartItem'])) return <Prev {...rest} />

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

export const Plugin = SimpleCartItemActionCard
