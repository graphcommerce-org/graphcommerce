import { useGtagViewItemList } from '@graphcommerce/googleanalytics'
import { ProductListItemsBase, ProductItemsGridProps } from '@graphcommerce/magento-product'
import { productListRenderer } from './productListRenderer'

export type ProductListItemsProps = Omit<ProductItemsGridProps, 'renderers'> & {
  title: string
  item_list_id?: string
}

export function ProductListItems(props: ProductListItemsProps) {
  const { title, item_list_id, items } = props

  // We're not really calling this conditionally, because NEXT_PUBLIC_GOOGLE_ANALYTICS is set at build time.
  if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useGtagViewItemList(title, items, item_list_id)
  }

  return <ProductListItemsBase renderers={productListRenderer} {...props} />
}
