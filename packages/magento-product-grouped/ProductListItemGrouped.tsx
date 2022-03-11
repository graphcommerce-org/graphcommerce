import { ProductListItem, ProductListItemProps } from '@graphcommerce/magento-product'
import { ProductListItemGroupedFragment } from './ProductListItemGrouped.gql'

export type ProductListItemGroupedProps = ProductListItemGroupedFragment & ProductListItemProps

export function ProductListItemGrouped(props: ProductListItemGroupedProps) {
  return <ProductListItem {...props} />
}
