import ProductListItemVirtualBase, {
  ProductListItemVirtualProps,
} from '@reachdigital/magento-product-virtual/ProductListItemVirtual'
import React from 'react'
import Subtitle from './Subtitle'

export default function ProductListItemVirtual(props: ProductListItemVirtualProps) {
  return (
    <ProductListItemVirtualBase
      {...props}
      subTitle={<Subtitle value='By Soxbase' />}
      aspectRatio={[1, 1]}
    />
  )
}
