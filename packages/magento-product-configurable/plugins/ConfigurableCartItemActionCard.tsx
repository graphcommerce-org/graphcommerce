import type { CartItemActionCard } from '@graphcommerce/magento-cart-items'
import type { PluginProps } from '@graphcommerce/next-config'
import { isTypename } from '@graphcommerce/next-ui'
import { ConfigurableCartItemOptions } from '../components'

export const component = 'CartItemActionCard'
export const exported =
  '@graphcommerce/magento-cart-items/components/CartItemActionCard/CartItemActionCard'

export function ConfigurableCartItemActionCard(
  props: PluginProps<React.ComponentProps<typeof CartItemActionCard>>,
) {
  const { Prev, ...rest } = props

  if (!isTypename(rest.cartItem, ['ConfigurableCartItem'])) return <Prev {...rest} />

  return (
    <Prev
      {...rest}
      details={
        <>
          {rest.details}
          <ConfigurableCartItemOptions
            {...rest.cartItem}
            productPrice={rest.cartItem.product.price_range.minimum_price.final_price.value}
          />
        </>
      }
    />
  )
}

export const Plugin = ConfigurableCartItemActionCard
