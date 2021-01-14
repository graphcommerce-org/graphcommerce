import CartItem2, { CartItemProps } from '@reachdigital/magento-cart/cart/CartItem2'
import { ConfigurableCartItemFragment } from './ConfigurableCartItem.gql'
import OptionsList from './OptionsList'

export default function ConfigurableCartItem(props: ConfigurableCartItemFragment & CartItemProps) {
  const { configurable_options, ...cartItemProps } = props
  return (
    <CartItem2 {...cartItemProps}>
      <OptionsList configurable_options={configurable_options} />
    </CartItem2>
  )
}
