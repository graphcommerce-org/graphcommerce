import { CartItem, CartItemProps } from '@graphcommerce/magento-cart-items'
import { ConfigurableCartItemFragment } from './ConfigurableCartItem.gql'
import { OptionsList } from './OptionsList'

export function ConfigurableCartItem(props: ConfigurableCartItemFragment & CartItemProps) {
  const { configurable_options, configurable_customizable, configured_variant, product } = props
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
