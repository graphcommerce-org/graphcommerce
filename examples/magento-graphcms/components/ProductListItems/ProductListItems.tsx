import {
  gtagSelectItem,
  useGtagViewItemList,
  UseGtagViewItemListProps,
} from '@graphcommerce/googleanalytics'
import { ProductListItemsBase, ProductItemsGridProps } from '@graphcommerce/magento-product'
import { productListRenderer } from './productListRenderer'

export type ProductListItemsProps = Omit<ProductItemsGridProps, 'renderers'> &
  UseGtagViewItemListProps

export function ProductListItems(props: ProductListItemsProps) {
  const { title, listId } = props

  useGtagViewItemList(props)

  return (
    <ProductListItemsBase
      renderers={productListRenderer}
      {...props}
      onClick={(e, item) => gtagSelectItem({ item, listId, title })}
    />
  )
}
