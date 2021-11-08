import { CartItem, CartItemProps } from '@graphcommerce/magento-cart-items'
import { ConfigurableCartItemFragment } from './ConfigurableCartItem.graphql'
import OptionsList from './OptionsList'

export default function ConfigurableCartItem(props: ConfigurableCartItemFragment & CartItemProps) {
  const { configurable_options, ...cartItemProps } = props
  return (
    <CartItem {...cartItemProps} withOptions>
      <OptionsList configurable_options={configurable_options} />
    </CartItem>
  )
}
