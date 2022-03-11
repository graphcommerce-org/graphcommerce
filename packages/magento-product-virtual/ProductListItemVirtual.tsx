import { ProductListItem, ProductListItemProps } from '@graphcommerce/magento-product'
import React from 'react'
import { ProductListItemVirtualFragment } from './ProductListItemVirtual.gql'

export type ProductListItemVirtualProps = ProductListItemVirtualFragment & ProductListItemProps

export function ProductListItemVirtual(props: ProductListItemVirtualProps) {
  return <ProductListItem {...props} />
}
