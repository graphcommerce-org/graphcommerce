import { ProductListItem, ProductListItemProps } from '@reachdigital/magento-product'
import React from 'react'
import { ProductListItemSimpleFragment } from './ProductListItemSimple.gql'

export type ProductListItemSimpleProps = ProductListItemSimpleFragment & ProductListItemProps

export default function ProductListItemSimple(props: ProductListItemSimpleProps) {
  return <ProductListItem {...props} />
}
