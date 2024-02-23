import { TypeRenderer } from '@graphcommerce/next-ui'
import { ProductListItemFragment } from '../../Api/ProductListItem.gql'
import { ProductListItem, ProductListItemSkeleton } from '../ProductListItem/ProductListItem'

type SkeletonType = { __typename: 'Skeleton'; uid: string }
export type ProductListItemType = ProductListItemFragment | SkeletonType
export type ProductListItemRenderer = TypeRenderer<ProductListItemFragment | SkeletonType>

/**
 * @deprecated Please use productListRenderer from the example directory instead.
 */
export const renderer: ProductListItemRenderer = {
  Skeleton: ProductListItemSkeleton,
  SimpleProduct: ProductListItem,
  ConfigurableProduct: ProductListItem,
  BundleProduct: ProductListItem,
  VirtualProduct: ProductListItem,
  DownloadableProduct: ProductListItem,
  GroupedProduct: ProductListItem,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore GiftCardProduct is only available in Commerce
  GiftCardProduct: (props) => <ProductListItem {...props} aspectRatio={[1, 1]} />,
}
