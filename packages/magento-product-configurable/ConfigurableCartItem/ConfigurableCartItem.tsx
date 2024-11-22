import type { CartItemProps } from '@graphcommerce/magento-cart-items'
import { CartItem } from '@graphcommerce/magento-cart-items'
import type { ConfigurableCartItemFragment } from './ConfigurableCartItem.gql'
import { OptionsList } from './OptionsList'

export function ConfigurableCartItem(props: ConfigurableCartItemFragment & CartItemProps) {
  const { configurable_options, configured_variant, product } = props
  return (
    <CartItem
      {...props}
      product={{
        ...product,
        name: configured_variant?.name ?? product.name,
        thumbnail: configured_variant?.thumbnail ?? product.thumbnail,
      }}
      withOptions
    >
      <OptionsList configurable_options={configurable_options} />
    </CartItem>
  )
}
