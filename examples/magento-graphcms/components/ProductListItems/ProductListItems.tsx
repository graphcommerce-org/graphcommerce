import { gtagSelectItem, useGtagViewItemList } from '@graphcommerce/googleanalytics'
import { ProductListItemsBase, ProductItemsGridProps } from '@graphcommerce/magento-product'
import { productListRenderer } from './productListRenderer'

export type ProductListItemsProps = Omit<ProductItemsGridProps, 'renderers'> & {
  title: string
  listId?: string
}

export function ProductListItems(props: ProductListItemsProps) {
  const { title, listId, items } = props

  useGtagViewItemList(title, items, listId)

  return (
    <ProductListItemsBase
      renderers={productListRenderer}
      {...props}
      onClick={(e, item) => gtagSelectItem(item, listId, title)}
    />
  )
}
