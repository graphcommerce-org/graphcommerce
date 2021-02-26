import ProductListItemSimpleBase, {
  ProductListItemSimpleProps,
} from '@reachdigital/magento-product-simple/ProductListItemSimple'
import React from 'react'
import Subtitle from './Subtitle'

export default function ProductListItemSimple(props: ProductListItemSimpleProps) {
  return (
    <ProductListItemSimpleBase
      {...props}
      subTitle={<Subtitle value='By Soxbase' />}
      aspectRatio={[1, 1]}
    />
  )
}
