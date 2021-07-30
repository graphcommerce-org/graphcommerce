import { TypeRenderer } from '@reachdigital/next-ui'
import { ProductListItemFragment } from '../../Api/ProductListItem.gql'
import ProductListItem from '../ProductListItem'

export type ProductListItemRenderer = TypeRenderer<ProductListItemFragment>

const renderer: ProductListItemRenderer = {
  SimpleProduct: ProductListItem,
  ConfigurableProduct: ProductListItem,
  BundleProduct: ProductListItem,
  VirtualProduct: ProductListItem,
  DownloadableProduct: ProductListItem,
  GroupedProduct: ProductListItem,
}

export default renderer
