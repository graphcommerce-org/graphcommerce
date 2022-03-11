import { TypeRenderer } from '@graphcommerce/next-ui'
import { ProductListItemFragment } from '../../Api/ProductListItem.gql'
import { ProductListItem } from '../ProductListItem/ProductListItem'

export type ProductListItemRenderer = TypeRenderer<ProductListItemFragment>

export const renderer: ProductListItemRenderer = {
  SimpleProduct: ProductListItem,
  ConfigurableProduct: ProductListItem,
  BundleProduct: ProductListItem,
  VirtualProduct: ProductListItem,
  DownloadableProduct: ProductListItem,
  GroupedProduct: ProductListItem,
}
