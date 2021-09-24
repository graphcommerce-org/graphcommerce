import { ProductListItem, ProductListItemProps } from '@graphcommerce/magento-product'
import React from 'react'
import { ProductListItemGroupedFragment } from './ProductListItemGrouped.gql'

export type ProductListItemGroupedProps = ProductListItemGroupedFragment & ProductListItemProps

export default function ProductListItemGrouped(props: ProductListItemGroupedProps) {
  return <ProductListItem {...props} />
}
