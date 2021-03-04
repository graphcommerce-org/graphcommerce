import ProductListItemBundle from '@reachdigital/magento-product-bundle/ProductListItemBundle'
import ProductListItemConfigurable from '@reachdigital/magento-product-configurable/ProductListItemConfigurable'
import ProductListItemDownloadable from '@reachdigital/magento-product-downloadable/ProductListItemDownloadable'
import ProductListItemGrouped from '@reachdigital/magento-product-grouped/ProductListItemGrouped'
import ProductListItemSimple from '@reachdigital/magento-product-simple/ProductListItemSimple'
import ProductListItemVirtual from '@reachdigital/magento-product-virtual/ProductListItemVirtual'
import { ProductListItemProps } from '@reachdigital/magento-product/ProductListItem'
import { TypeRenderer } from '@reachdigital/next-ui/RenderType'
import { ProductListItemRendererFragment } from './ProductListItemRenderer.gql'

const renderer: TypeRenderer<ProductListItemRendererFragment, ProductListItemProps> = {
  SimpleProduct: ProductListItemSimple,
  ConfigurableProduct: ProductListItemConfigurable,
  BundleProduct: ProductListItemBundle,
  VirtualProduct: ProductListItemVirtual,
  DownloadableProduct: ProductListItemDownloadable,
  GroupedProduct: ProductListItemGrouped,
}

export default renderer
