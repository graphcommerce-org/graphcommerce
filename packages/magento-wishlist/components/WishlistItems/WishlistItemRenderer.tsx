import { TypeRenderer } from '@graphcommerce/next-ui'
import { WishListItem } from '../../hooks'
import { WishlistItem } from '../WishlistItem/WishlistItem'
import { WishlistItemConfigurable } from '../WishlistItem/WishlistItemConfigurable'

export type WishlistItemRenderer = TypeRenderer<NonNullable<WishListItem>>

export const renderer: WishlistItemRenderer = {
  BundleWishlistItem: WishlistItem,
  ConfigurableWishlistItem: WishlistItemConfigurable,
  DownloadableWishlistItem: WishlistItem,
  GroupedProductWishlistItem: WishlistItem,
  SimpleWishlistItem: WishlistItem,
  VirtualWishlistItem: WishlistItem,
}
