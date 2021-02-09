import { ProductListItemRendererFragment } from '@reachdigital/magento-product-types/ProductListItems/ProductListItemRenderer.gql'
import { ProductListItemProps } from '@reachdigital/magento-product/ProductListItem'
import { TypeRenderer } from '@reachdigital/next-ui/RenderType'
import ProductListItemBundle from '../ProductListItem/ProductListItemBundle'
import ProductListItemConfigurable from '../ProductListItem/ProductListItemConfigurable'
import ProductListItemDownloadable from '../ProductListItem/ProductListItemDownloadable'
import ProductListItemGiftCard from '../ProductListItem/ProductListItemGiftCard'
import ProductListItemGrouped from '../ProductListItem/ProductListItemGrouped'
import ProductListItemSimple from '../ProductListItem/ProductListItemSimple'
import ProductListItemVirtual from '../ProductListItem/ProductListItemVirtual'

const renderer: TypeRenderer<ProductListItemRendererFragment, ProductListItemProps> = {
  SimpleProduct: ProductListItemSimple,
  ConfigurableProduct: ProductListItemConfigurable,
  BundleProduct: ProductListItemBundle,
  VirtualProduct: ProductListItemVirtual,
  DownloadableProduct: ProductListItemDownloadable,
  GroupedProduct: ProductListItemGrouped,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore GiftCardProduct is only available in Commerce
  GiftCardProduct: ProductListItemGiftCard,
}

export default renderer
