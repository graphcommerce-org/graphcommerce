import ProductListItem, {
  ProductListItemProps,
} from '@reachdigital/magento-product/ProductListItem'
import React from 'react'
import { ProductListItemDownloadableFragment } from './ProductListItemDownloadable.gql'

export type ProductListItemDownloadableProps = ProductListItemDownloadableFragment &
  ProductListItemProps

export default function ProductListItemDownloadable(props: ProductListItemDownloadableProps) {
  return <ProductListItem {...props} />
}
