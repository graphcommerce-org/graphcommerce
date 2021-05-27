import { Typography, TypographyProps } from '@material-ui/core'
import ProductListItemBundle from '@reachdigital/magento-product-bundle/ProductListItemBundle'
import ProductListItemConfigurable from '@reachdigital/magento-product-configurable/ProductListItemConfigurable'
import { ProductListItemDownloadable } from '@reachdigital/magento-product-downloadable'
import ProductListItemGrouped from '@reachdigital/magento-product-grouped/ProductListItemGrouped'
import ProductListItemSimple from '@reachdigital/magento-product-simple/ProductListItemSimple'
import { ProductListItemVirtual } from '@reachdigital/magento-product-virtual'
import { ProductListItemRenderer } from '@reachdigital/magento-product/ProductListItems/renderer'
import React from 'react'

console.log(ProductListItemDownloadable)

const Subtitle = (props: TypographyProps) => (
  <Typography component='span' variant='subtitle2' {...props} />
)

const renderers: ProductListItemRenderer = {
  SimpleProduct: (props) => (
    <ProductListItemSimple
      {...props}
      subTitle={<Subtitle>By Soxbase</Subtitle>}
      aspectRatio={[1, 1]}
    />
  ),
  ConfigurableProduct: (props) => (
    <ProductListItemConfigurable
      {...props}
      subTitle={<Subtitle>By Soxbase</Subtitle>}
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
      subTitle={<Subtitle>By Soxbase</Subtitle>}
      aspectRatio={[1, 1]}
    />
  ),
  VirtualProduct: (props) => (
    <ProductListItemVirtual
      {...props}
      subTitle={<Subtitle>By Soxbase</Subtitle>}
      aspectRatio={[1, 1]}
    />
  ),
  DownloadableProduct: (props) => (
    <ProductListItemDownloadable
      {...props}
      subTitle={<Subtitle>By Soxbase</Subtitle>}
      aspectRatio={[1, 1]}
    />
  ),
  GroupedProduct: (props) => (
    <ProductListItemGrouped
      {...props}
      subTitle={<Subtitle>By Soxbase</Subtitle>}
      aspectRatio={[1, 1]}
    />
  ),
  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // // @ts-ignore GiftCardProduct is only available in Commerce
  // GiftCardProduct: (props) => (
  //   <ProductListItem {...props} subTitle={<Subtitle>By Soxbase</Subtitle>} aspectRatio={[1, 1]} />
  // ),
}

export default renderers
