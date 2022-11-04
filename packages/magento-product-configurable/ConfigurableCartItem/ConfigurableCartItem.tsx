import { CartItem, CartItemProps } from '@graphcommerce/magento-cart-items'
import { ConfigurableCartItemFragment } from './ConfigurableCartItem.gql'
import { OptionsList } from './OptionsList'

export function ConfigurableCartItem(props: ConfigurableCartItemFragment & CartItemProps) {
  const { configurable_options, configurable_customizable, ...cartItemProps } = props
  return (
    <CartItem {...cartItemProps} withOptions>
      <OptionsList
        configurable_options={configurable_options}
        configurable_customizable={configurable_customizable}
      />
    </CartItem>
  )
}
