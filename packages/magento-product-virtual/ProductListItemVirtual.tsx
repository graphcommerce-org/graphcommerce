import { ProductListItem, ProductListItemProps } from '@reachdigital/magento-product'
import React from 'react'
import { ProductListItemVirtualFragment } from './ProductListItemVirtual.gql'

export type ProductListItemVirtualProps = ProductListItemVirtualFragment & ProductListItemProps

export default function ProductListItemVirtual(props: ProductListItemVirtualProps) {
  return <ProductListItem {...props} />
}
