import { ProductListItem, ProductListItemProps } from '@graphcommerce/magento-product'
import React from 'react'
import { ProductListItemDownloadableFragment } from './ProductListItemDownloadable.graphql'

export type ProductListItemDownloadableProps = ProductListItemDownloadableFragment &
  ProductListItemProps

export default function ProductListItemDownloadable(props: ProductListItemDownloadableProps) {
  return <ProductListItem {...props} />
}
