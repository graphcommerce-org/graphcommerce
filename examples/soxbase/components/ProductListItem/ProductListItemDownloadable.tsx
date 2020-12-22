import ProductListItemDownloadableBase, {
  ProductListItemDownloadableProps,
} from '@reachdigital/magento-product-downloadable/ProductListItemDownloadable'
import React from 'react'
import Subtitle from './Subtitle'

export default function ProductListItemDownloadable(props: ProductListItemDownloadableProps) {
  return (
    <ProductListItemDownloadableBase
      {...props}
      subTitle={<Subtitle value='By Soxbase' />}
      aspectRatio={[1, 1]}
    />
  )
}
