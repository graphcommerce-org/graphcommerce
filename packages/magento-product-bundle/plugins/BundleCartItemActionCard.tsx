import { type CartItemActionCard } from '@graphcommerce/magento-cart-items'
import type { PluginProps } from '@graphcommerce/next-config'
import { isTypename } from '@graphcommerce/next-ui'
import { BundleProductCartItemOptions } from '../components/BundleProductCartItemOptions/BundleProductCartItemOptions'

export const component = 'CartItemActionCard'
export const exported =
  '@graphcommerce/magento-cart-items/components/CartItemActionCard/CartItemActionCard'

export function BundleCartItemActionCard(
  props: PluginProps<React.ComponentProps<typeof CartItemActionCard>>,
) {
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

export const Plugin = BundleCartItemActionCard
