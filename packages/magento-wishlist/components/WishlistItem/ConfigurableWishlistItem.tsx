import { ConfigurableWishlistItemFragment } from './ConfigurableWishlistItem.gql'
import { WishlistItem, WishlistItemProps } from './WishlistItem'
import { WishlistItemFragment } from './WishlistItem.gql'

export function ConfigurableWishlistItem(
  props: ConfigurableWishlistItemFragment & WishlistItemProps,
) {
  const { configurable_options, ...wishlistItemProps } = props

  return <WishlistItem {...wishlistItemProps} />
}
