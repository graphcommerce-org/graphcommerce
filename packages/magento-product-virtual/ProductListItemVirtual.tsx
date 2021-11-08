import { ProductListItem, ProductListItemProps } from '@graphcommerce/magento-product'
import React from 'react'
import { ProductListItemVirtualFragment } from './ProductListItemVirtual.graphql'

export type ProductListItemVirtualProps = ProductListItemVirtualFragment & ProductListItemProps

export default function ProductListItemVirtual(props: ProductListItemVirtualProps) {
  return <ProductListItem {...props} />
}
