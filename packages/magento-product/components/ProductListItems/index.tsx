import ProductListItemsBase, { ProductItemsGridProps } from './ProductListItemsBase'
import renderer from './renderer'

export default function ProductListItems(props: Omit<ProductItemsGridProps, 'renderers'>) {
  return <ProductListItemsBase renderers={renderer} {...props} />
}
