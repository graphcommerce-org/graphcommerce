import { WishlistItem, WishlistItemProps } from './WishlistItem'
import { WishlistItemFragment } from './WishlistItem.gql'

export function ConfigurableWishlistItem(props: WishlistItemProps) {
  const { ...wishlistItemProps } = props

  return <WishlistItem {...wishlistItemProps} withOptions />
}
