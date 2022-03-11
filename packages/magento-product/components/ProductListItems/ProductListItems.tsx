import { ProductListItemsBase, ProductItemsGridProps } from './ProductListItemsBase'
import { renderer } from './renderer'

export function ProductListItems(props: Omit<ProductItemsGridProps, 'renderers'>) {
  return <ProductListItemsBase renderers={renderer} {...props} />
}
