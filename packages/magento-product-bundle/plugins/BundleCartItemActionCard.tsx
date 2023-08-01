import {
  SelectedCustomizableOptions,
  type CartItemActionCard,
} from '@graphcommerce/magento-cart-items'
import type { PluginProps } from '@graphcommerce/next-config'
import { isTypename } from '@graphcommerce/next-ui'
import { BundleOption } from '../components/BundleProductOptions/BundleOption'
import { BundleProductCartItemOptions } from '../components/BundleProductCartItemOptions/BundleProductCartItemOptions'

export const component = 'CartItemActionCard'
export const exported = '@graphcommerce/magento-cart-items/CartItemActionCard/CartItemActionCard'

export function BundleCartItemActionCard(
  props: PluginProps<React.ComponentProps<typeof CartItemActionCard>>,
) {
  const { Prev, ...rest } = props

  if (!isTypename(rest.cartItem, ['BundleCartItem'])) return <Prev {...rest} />

  return (
    <Prev
      {...rest}
      details={
        <BundleProductCartItemOptions
          prices={rest.cartItem.prices}
          bundle_options={rest.cartItem.bundle_options}
          customizable_options={rest.cartItem.customizable_options}
        />
      }
    />
  )
}

export const Plugin = BundleCartItemActionCard
