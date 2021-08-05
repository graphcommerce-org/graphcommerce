import { Typography, TypographyProps } from '@material-ui/core'
import { ProductListItemRenderer } from '@reachdigital/magento-product'
import { ProductListItemBundle } from '@reachdigital/magento-product-bundle'
import { ProductListItemConfigurable } from '@reachdigital/magento-product-configurable'
import { ProductListItemDownloadable } from '@reachdigital/magento-product-downloadable'
import { ProductListItemGrouped } from '@reachdigital/magento-product-grouped'
import { ProductListItemSimple } from '@reachdigital/magento-product-simple'
import { ProductListItemVirtual } from '@reachdigital/magento-product-virtual'
import { ProductReviewSummary } from '@reachdigital/magento-review'
import React from 'react'

const Subtitle = (props: TypographyProps) => (
  <Typography component='span' variant='overline' {...props} />
)

const renderers: ProductListItemRenderer = {
  SimpleProduct: (props) => {
    const { rating_summary } = props
    return (
      <ProductListItemSimple
        {...props}
        subTitle={<Subtitle>By Soxbase</Subtitle>}
        aspectRatio={[1, 1]}
        bottomRight={<ProductReviewSummary rating_summary={rating_summary} />}
      />
    )
  },
  ConfigurableProduct: (props) => {
    const { rating_summary } = props
    return (
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
        bottomRight={<ProductReviewSummary rating_summary={rating_summary} />}
      />
    )
  },
  BundleProduct: (props) => {
    const { rating_summary } = props
    return (
      <ProductListItemBundle
        {...props}
        subTitle={<Subtitle>By Soxbase</Subtitle>}
        aspectRatio={[1, 1]}
        bottomRight={<ProductReviewSummary rating_summary={rating_summary} />}
      />
    )
  },
  VirtualProduct: (props) => {
    const { rating_summary } = props
    return (
      <ProductListItemVirtual
        {...props}
        subTitle={<Subtitle>By Soxbase</Subtitle>}
        aspectRatio={[1, 1]}
        bottomRight={<ProductReviewSummary rating_summary={rating_summary} />}
      />
    )
  },
  DownloadableProduct: (props) => {
    const { rating_summary } = props

    return (
      <ProductListItemDownloadable
        {...props}
        subTitle={<Subtitle>By Soxbase</Subtitle>}
        aspectRatio={[1, 1]}
        bottomRight={<ProductReviewSummary rating_summary={rating_summary} />}
      />
    )
  },
  GroupedProduct: (props) => {
    const { rating_summary } = props

    return (
      <ProductListItemGrouped
        {...props}
        subTitle={<Subtitle>By Soxbase</Subtitle>}
        aspectRatio={[1, 1]}
        bottomRight={<ProductReviewSummary rating_summary={rating_summary} />}
      />
    )
  },
  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // // @ts-ignore GiftCardProduct is only available in Commerce
  // GiftCardProduct: (props) => (
  //   <ProductListItem {...props} subTitle={<Subtitle>By Soxbase</Subtitle>} aspectRatio={[1, 1]} />
  // ),
}

export default renderers
