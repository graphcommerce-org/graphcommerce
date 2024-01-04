import {
  SelectedCustomizableOptions,
  type CartItemActionCard,
} from '@graphcommerce/magento-cart-items'
import type { PluginProps } from '@graphcommerce/next-config'
import { isTypename } from '@graphcommerce/next-ui'

export const component = 'CartItemActionCard'
export const exported =
  '@graphcommerce/magento-cart-items/components/CartItemActionCard/CartItemActionCard'

export function SimpleCartItemActionCard(
  props: PluginProps<React.ComponentProps<typeof CartItemActionCard>>,
) {
  const { Prev, cartItem, ...rest } = props

  if (!isTypename(cartItem, ['SimpleCartItem'])) return <Prev cartItem={cartItem} {...rest} />

  return (
    <Prev
      {...rest}
      cartItem={cartItem}
      details={
        <>
          {rest.details}
          <SelectedCustomizableOptions {...cartItem} />
        </>
      }
    />
  )
}

export const Plugin = SimpleCartItemActionCard
