import type { ProductListItemProps } from '@graphcommerce/magento-product'
import { ProductListItem } from '@graphcommerce/magento-product'
import type { ProductListItemSimpleFragment } from './ProductListItemSimple.gql'

export type ProductListItemSimpleProps = ProductListItemSimpleFragment & ProductListItemProps

export function ProductListItemSimple(props: ProductListItemSimpleProps) {
  return <ProductListItem {...props} />
}
