import ProductListItemBundleBase, {
  ProdustListItemBundleProps,
} from '@reachdigital/magento-product-bundle/ProductListItemBundle'
import React from 'react'
import Subtitle from './Subtitle'

export default function ProductListItemBundle(props: ProdustListItemBundleProps) {
  return (
    <ProductListItemBundleBase
      {...props}
      subTitle={<Subtitle value='By Soxbase' />}
      aspectRatio={[1, 1]}
    />
  )
}
