import CartItem, { CartItemProps } from '@reachdigital/magento-cart/cart/CartItem'
import { ConfigurableCartItemFragment } from './ConfigurableCartItem.gql'
import OptionsList from './OptionsList'

export default function ConfigurableCartItem(props: ConfigurableCartItemFragment & CartItemProps) {
  const { configurable_options, ...cartItemProps } = props
  return (
    <CartItem {...cartItemProps}>
      <OptionsList configurable_options={configurable_options} />
    </CartItem>
  )
}
