import { ProductListItemsBase, ProductItemsGridProps } from '@graphcommerce/magento-product'
import { productListRenderer } from './productListRenderer'

export type ProductListItemsProps = Omit<ProductItemsGridProps, 'renderers'>

export function ProductListItems(props: ProductListItemsProps) {
  return <ProductListItemsBase renderers={productListRenderer} {...props} />
}
