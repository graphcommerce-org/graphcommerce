import { Typography, TypographyProps } from '@material-ui/core'
import { ProductListItemBundle } from '@reachdigital/magento-product-bundle'
import { ProductListItemConfigurable } from '@reachdigital/magento-product-configurable'
import { ProductListItemDownloadable } from '@reachdigital/magento-product-downloadable'
import { ProductListItemGrouped } from '@reachdigital/magento-product-grouped'
import { ProductReviewSummary } from '@reachdigital/magento-product-review'
import { ProductListItemSimple } from '@reachdigital/magento-product-simple'
import { ProductListItemVirtual } from '@reachdigital/magento-product-virtual'
import { ProductListItemRenderer } from '@reachdigital/magento-product/ProductListItems/renderer'
import React from 'react'

const Subtitle = (props: TypographyProps) => (
  <Typography component='span' variant='subtitle2' {...props} />
)

const renderers: ProductListItemRenderer = {
  SimpleProduct: (props) => (
    <ProductListItemSimple
      {...props}
      subTitle={<Subtitle>By Soxbase</Subtitle>}
      aspectRatio={[1, 1]}
      bottomRight={<ProductReviewSummary {...props} />}
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
      bottomRight={<ProductReviewSummary {...props} />}
    />
  ),
  BundleProduct: (props) => (
    <ProductListItemBundle
      {...props}
      subTitle={<Subtitle>By Soxbase</Subtitle>}
      aspectRatio={[1, 1]}
      bottomRight={<ProductReviewSummary {...props} />}
    />
  ),
  VirtualProduct: (props) => (
    <ProductListItemVirtual
      {...props}
      subTitle={<Subtitle>By Soxbase</Subtitle>}
      aspectRatio={[1, 1]}
      bottomRight={<ProductReviewSummary {...props} />}
    />
  ),
  DownloadableProduct: (props) => (
    <ProductListItemDownloadable
      {...props}
      subTitle={<Subtitle>By Soxbase</Subtitle>}
      aspectRatio={[1, 1]}
      bottomRight={<ProductReviewSummary {...props} />}
    />
  ),
  GroupedProduct: (props) => (
    <ProductListItemGrouped
      {...props}
      subTitle={<Subtitle>By Soxbase</Subtitle>}
      aspectRatio={[1, 1]}
      bottomRight={<ProductReviewSummary {...props} />}
    />
  ),
  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // // @ts-ignore GiftCardProduct is only available in Commerce
  // GiftCardProduct: (props) => (
  //   <ProductListItem {...props} subTitle={<Subtitle>By Soxbase</Subtitle>} aspectRatio={[1, 1]} />
  // ),
}

export default renderers
