import { ProductListItemsBase, ProductItemsGridProps } from '@graphcommerce/magento-product'
import { productListRenderer } from './productListRenderer'

export type ProductListItemsProps = Omit<ProductItemsGridProps, 'renderers'>

/**
 * @deprecated Use ProductListItems from @graphcommerce/next-ui instead
 */
export function ProductListItems(props: ProductListItemsProps) {
  return <ProductListItemsBase renderers={productListRenderer} {...props} />
}
