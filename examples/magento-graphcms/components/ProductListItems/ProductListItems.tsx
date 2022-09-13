import { gtagSelectItem, useGtagViewItemList } from '@graphcommerce/googleanalytics'
import {
  ProductListItemsBase,
  ProductItemsGridProps,
  ProductListItemProps,
} from '@graphcommerce/magento-product'
import { useEventCallback } from '@mui/material'
import { productListRenderer } from './productListRenderer'

export type ProductListItemsProps = Omit<ProductItemsGridProps, 'renderers'> & {
  title: string
  item_list_id?: string
}

export function ProductListItems(props: ProductListItemsProps) {
  const { title, item_list_id, items } = props

  let clickHandler: ProductListItemProps['onClick']
  // We're not really calling this conditionally, because NEXT_PUBLIC_GOOGLE_ANALYTICS is set at build time.
  if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGtagViewItemList(title, items, item_list_id)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    clickHandler = useEventCallback((e, item) => {
      gtagSelectItem(item, item_list_id, title)
    })
  }

  return <ProductListItemsBase renderers={productListRenderer} {...props} onClick={clickHandler} />
}
