import {
  SelectedCustomizableOptions,
  type CartItemActionCard,
} from '@graphcommerce/magento-cart-items'
import type { PluginProps } from '@graphcommerce/next-config'
import { isTypename } from '@graphcommerce/next-ui'

export const component = 'CartItemActionCard'
export const exported = '@graphcommerce/magento-cart-items/CartItemActionCard/CartItemActionCard'

export function SimpleCartItemActionCard(
  props: PluginProps<React.ComponentProps<typeof CartItemActionCard>>,
) {
  const { Prev, ...rest } = props

  if (!isTypename(rest.cartItem, ['SimpleCartItem'])) return <Prev {...rest} />

  return (
    <Prev
      {...rest}
      details={
        <>
          {rest.details}
          <SelectedCustomizableOptions customizable_options={rest.cartItem.customizable_options} />
        </>
      }
    />
  )
}

export const Plugin = SimpleCartItemActionCard
