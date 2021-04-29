import CartItem, { CartItemProps } from '@reachdigital/magento-cart-items/CartItem/CartItem'
import { BundleCartItemFragment } from './BundleCartItem.gql'

export default function BundleCartItem(props: BundleCartItemFragment & CartItemProps) {
  const { bundle_options, ...cartItemProps } = props
  return (
    <CartItem {...cartItemProps} withOptions>
      {bundle_options.map((option) => {
        if (!option?.uid) return null
        return (
          <div key={option.uid}>
            {option.values.map((value) => {
              if (!value?.uid) return null

              return (
                <div key={value.uid}>
                  {value.label} {value.quantity} {value.price}
                </div>
              )
            })}
          </div>
        )
      })}
    </CartItem>
  )
}
