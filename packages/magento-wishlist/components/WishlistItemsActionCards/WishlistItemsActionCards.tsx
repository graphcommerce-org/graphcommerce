import { useWishlistItems } from '../../hooks'
import { WishlistItemActionCard } from '../WishlistItemActionCard/WishlistItemActionCard'

export function WishlistItemsActionCards() {
  const wishlistItemsData = useWishlistItems()

  /** Structure between guest and customer wishlist differs */
  return (
    <>
      {wishlistItemsData.data?.map((item) => {
        if (!item?.uid && !item?.id) return null
        return <WishlistItemActionCard variant='default' {...item} />
      })}
    </>
  )
}
