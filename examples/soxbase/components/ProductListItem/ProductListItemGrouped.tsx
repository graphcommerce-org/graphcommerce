import ProductListItem, {
  ProductListItemGroupedProps,
} from '@reachdigital/magento-product-grouped/ProductListItemGrouped'
import React from 'react'
import Subtitle from './Subtitle'

export default function ProductListItemGrouped(props: ProductListItemGroupedProps) {
  return (
    <ProductListItem {...props} subTitle={<Subtitle value='By Soxbase' />} aspectRatio={[1, 1]} />
  )
}
