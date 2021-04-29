import ProductListItemBundle from '@reachdigital/magento-product-bundle/ProductListItemBundle'
import ProductListItemConfigurable from '@reachdigital/magento-product-configurable/ProductListItemConfigurable'
import ProductListItemDownloadable from '@reachdigital/magento-product-downloadable/ProductListItemDownloadable'
import ProductListItemGrouped from '@reachdigital/magento-product-grouped/ProductListItemGrouped'
import ProductListItemSimple from '@reachdigital/magento-product-simple/ProductListItemSimple'
import ProductListItemVirtual from '@reachdigital/magento-product-virtual/ProductListItemVirtual'
import { ProductListItemRenderer } from '@reachdigital/magento-product/ProductListItems/renderer'
import React from 'react'
import Subtitle from '../ProductListItem/Subtitle'

const renderers: ProductListItemRenderer = {
  SimpleProduct: (props) => (
    <ProductListItemSimple
      {...props}
      subTitle={<Subtitle value='By Soxbase' />}
      aspectRatio={[1, 1]}
    />
  ),
  ConfigurableProduct: (props) => (
    <ProductListItemConfigurable
      {...props}
      subTitle={<Subtitle value='By Soxbase' />}
      aspectRatio={[1, 1]}
      swatchLocations={{
        topLeft: [],
        topRight: ['size'],
        bottomLeft: ['color'],
        bottomRight: [],
      }}
    />
  ),
  BundleProduct: (props) => (
    <ProductListItemBundle
      {...props}
      subTitle={<Subtitle value='By Soxbase' />}
      aspectRatio={[1, 1]}
    />
  ),
  VirtualProduct: (props) => (
    <ProductListItemVirtual
      {...props}
      subTitle={<Subtitle value='By Soxbase' />}
      aspectRatio={[1, 1]}
    />
  ),
  DownloadableProduct: (props) => (
    <ProductListItemDownloadable
      {...props}
      subTitle={<Subtitle value='By Soxbase' />}
      aspectRatio={[1, 1]}
    />
  ),
  GroupedProduct: (props) => (
    <ProductListItemGrouped
      {...props}
      subTitle={<Subtitle value='By Soxbase' />}
      aspectRatio={[1, 1]}
    />
  ),
  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // // @ts-ignore GiftCardProduct is only available in Commerce
  // GiftCardProduct: (props) => (
  //   <ProductListItem {...props} subTitle={<Subtitle value='By Soxbase' />} aspectRatio={[1, 1]} />
  // ),
}

export default renderers
