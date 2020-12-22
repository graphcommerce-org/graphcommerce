import ProductListItemConfigurableBase, {
  ProdustListItemConfigurableProps,
} from '@reachdigital/magento-product-configurable/ProductListItemConfigurable'
import { OverlayAreaKeys } from '@reachdigital/magento-product/ProductListItem'
import React from 'react'
import Subtitle from './Subtitle'

export default function ProductListItemConfigurable(props: ProdustListItemConfigurableProps) {
  const swatchLocations: Record<OverlayAreaKeys, string[]> = {
    topLeft: [],
    topRight: ['fashion_size'],
    bottomLeft: ['fashion_color'],
    bottomRight: [],
  }

  return (
    <>
      <ProductListItemConfigurableBase
        subTitle={<Subtitle value='By Soxbase' />}
        aspectRatio={[1, 1]}
        {...props}
        swatchLocations={swatchLocations}
      />
    </>
  )
}
