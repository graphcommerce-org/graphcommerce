import type { ProductListItemProps } from '@graphcommerce/magento-product'
import { ProductListItem } from '@graphcommerce/magento-product'
import type { ProductListItemGroupedFragment } from './ProductListItemGrouped.gql'

export type ProductListItemGroupedProps = ProductListItemGroupedFragment & ProductListItemProps

export function ProductListItemGrouped(props: ProductListItemGroupedProps) {
  return <ProductListItem {...props} />
}
