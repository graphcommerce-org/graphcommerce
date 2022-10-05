import { gtagSelectItem, useGtagViewItemList } from '@graphcommerce/googleanalytics'
import { ProductListItemsBase, ProductItemsGridProps } from '@graphcommerce/magento-product'
import { productListRenderer } from './productListRenderer'

export type ProductListItemsProps = Omit<ProductItemsGridProps, 'renderers'> & {
  title: string
  item_list_id?: string
}

export function ProductListItems(props: ProductListItemsProps) {
  const { title, item_list_id, items } = props

  useGtagViewItemList(title, items, item_list_id)

  return (
    <ProductListItemsBase
      renderers={productListRenderer}
      {...props}
      onClick={(e, item) => {
        gtagSelectItem(item, item_list_id, title)
      }}
    />
  )
}
