import { ProductListItemsBase, ProductItemsGridProps } from '@reachdigital/magento-product'
import renderers from './renderers'

export type ProductListItemsProps = Omit<ProductItemsGridProps, 'renderers'>

export default function ProductListItems(props: ProductListItemsProps) {
  return <ProductListItemsBase renderers={renderers} {...props} />
}
