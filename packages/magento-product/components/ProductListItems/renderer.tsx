import type { TypeRenderer } from '@graphcommerce/next-ui'
import type { ProductListItemFragment } from '../../Api/ProductListItem.gql'
import { ProductListItem } from '../ProductListItem/ProductListItem'

type SkeletonType = { __typename: 'Skeleton'; uid: string }
export type ProductListItemType = ProductListItemFragment | SkeletonType
export type ProductListItemRenderer = TypeRenderer<ProductListItemFragment | SkeletonType>

/**
 * @deprecated Please use productListRenderer from the example directory instead.
 */
export const renderer: ProductListItemRenderer = {
  Skeleton: ProductListItem,
  SimpleProduct: ProductListItem,
  ConfigurableProduct: ProductListItem,
  BundleProduct: ProductListItem,
  VirtualProduct: ProductListItem,
  DownloadableProduct: ProductListItem,
  GroupedProduct: ProductListItem,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore GiftCardProduct is only available in Commerce
  GiftCardProduct: ProductListItem,
}
