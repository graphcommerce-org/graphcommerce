import { TypeRenderer } from '@graphcommerce/next-ui'
import { ProductListItemFragment } from '../../Api/ProductListItem.gql'
import { ProductListItem, ProductListItemSkeleton } from '../ProductListItem/ProductListItem'

type SkeletonType = { __typename: 'Skeleton'; uid: string }
export type ProductListItemType = ProductListItemFragment | SkeletonType
export type ProductListItemRenderer = TypeRenderer<ProductListItemFragment | SkeletonType>

export const renderer: ProductListItemRenderer = {
  Skeleton: ProductListItemSkeleton,
  SimpleProduct: ProductListItem,
  ConfigurableProduct: ProductListItem,
  BundleProduct: ProductListItem,
  VirtualProduct: ProductListItem,
  DownloadableProduct: ProductListItem,
  GroupedProduct: ProductListItem,
}
