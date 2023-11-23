import {
  SelectedCustomizableOptions,
  type CartItemActionCard,
} from '@graphcommerce/magento-cart-items'
import type { PluginProps } from '@graphcommerce/next-config'
import { isTypename } from '@graphcommerce/next-ui'

export const component = 'CartItemActionCard'
export const exported =
  '@graphcommerce/magento-cart-items/components/CartItemActionCard/CartItemActionCard'

export function VirtualCartItemActionCard(
  props: PluginProps<React.ComponentProps<typeof CartItemActionCard>>,
) {
  const { Prev, ...rest } = props

  if (!isTypename(rest.cartItem, ['VirtualCartItem'])) return <Prev {...rest} />

  return (
    <Prev
      {...rest}
      details={
        <>
          {rest.details}
          <SelectedCustomizableOptions
            customizable_options={rest.cartItem.customizable_options}
            productPrice={rest.cartItem.product.price_range.minimum_price.final_price.value}
          />
        </>
      }
    />
  )
}

export const Plugin = VirtualCartItemActionCard
