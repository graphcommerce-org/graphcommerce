import { TypeRenderer } from '@graphcommerce/next-ui'
import { WishlistItem } from '../WishlistItem/WishlistItem'
import { WishlistItemProductFragment } from '../WishlistItem/WishlistItemProduct.gql'

export type WishlistItemRenderer = TypeRenderer<WishlistItemProductFragment>

export const renderer: WishlistItemRenderer = {
  BundleProduct: WishlistItem,
  ConfigurableProduct: WishlistItem,
  DownloadableProduct: WishlistItem,
  GroupedProduct: WishlistItem,
  SimpleProduct: WishlistItem,
  VirtualProduct: WishlistItem,
}
