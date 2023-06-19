import { ProductListItemsBase, ProductItemsGridProps } from './ProductListItemsBase'
import { renderer } from './renderer'

/** @deprecated Use `ProductListItemsBase` instead. */
export function ProductListItems(props: Omit<ProductItemsGridProps, 'renderers'>) {
  return <ProductListItemsBase renderers={renderer} {...props} />
}
