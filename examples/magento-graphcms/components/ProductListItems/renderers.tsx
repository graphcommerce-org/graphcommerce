import { ProductListItemRenderer } from '@graphcommerce/magento-product'
import { ProductListItemBundle } from '@graphcommerce/magento-product-bundle'
import { ProductListItemConfigurable } from '@graphcommerce/magento-product-configurable'
import { ProductListItemDownloadable } from '@graphcommerce/magento-product-downloadable'
import { ProductListItemGrouped } from '@graphcommerce/magento-product-grouped'
import { ProductListItemSimple } from '@graphcommerce/magento-product-simple'
import { ProductListItemVirtual } from '@graphcommerce/magento-product-virtual'
import { ProductReviewSummary } from '@graphcommerce/magento-review'
import { Typography, TypographyProps } from '@material-ui/core'
import React from 'react'

const Subtitle = (props: TypographyProps) => (
  <Typography component='span' variant='caption' {...props} />
)

const renderers: ProductListItemRenderer = {
  SimpleProduct: (props) => {
    const { rating_summary } = props
    return (
      <ProductListItemSimple
        {...props}
        subTitle={<Subtitle>BY GC</Subtitle>}
        aspectRatio={[1, 1]}
        bottomLeft={<ProductReviewSummary rating={rating_summary} />}
      />
    )
  },
  ConfigurableProduct: (props) => {
    const { rating_summary } = props

    return (
      <ProductListItemConfigurable
        {...props}
        subTitle={<Subtitle>BY GC</Subtitle>}
        aspectRatio={[1, 1]}
        swatchLocations={{
          topLeft: [],
          topRight: [], // ['size']
          bottomLeft: [],
          bottomRight: ['dominant_color'],
        }}
        bottomLeft={<ProductReviewSummary rating={rating_summary} />}
      />
    )
  },
  BundleProduct: (props) => {
    const { rating_summary } = props

    return (
      <ProductListItemBundle
        {...props}
        subTitle={<Subtitle>BY GC</Subtitle>}
        aspectRatio={[1, 1]}
        bottomLeft={<ProductReviewSummary rating={rating_summary} />}
      />
    )
  },
  VirtualProduct: (props) => {
    const { rating_summary } = props

    return (
      <ProductListItemVirtual
        {...props}
        subTitle={<Subtitle>BY GC</Subtitle>}
        aspectRatio={[1, 1]}
        bottomLeft={<ProductReviewSummary rating={rating_summary} />}
      />
    )
  },
  DownloadableProduct: (props) => {
    const { rating_summary } = props

    return (
      <ProductListItemDownloadable
        {...props}
        subTitle={<Subtitle>BY GC</Subtitle>}
        aspectRatio={[1, 1]}
        bottomLeft={<ProductReviewSummary rating={rating_summary} />}
      />
    )
  },
  GroupedProduct: (props) => {
    const { rating_summary } = props

    return (
      <ProductListItemGrouped
        {...props}
        subTitle={<Subtitle>BY GC</Subtitle>}
        aspectRatio={[1, 1]}
        bottomLeft={<ProductReviewSummary rating={rating_summary} />}
      />
    )
  },
  // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // // @ts-ignore GiftCardProduct is only available in Commerce
  // GiftCardProduct: (props) => (
  //   <ProductListItem {...props} subTitle={<Subtitle>BY GC</Subtitle>} aspectRatio={[1, 1]} />
  // ),
}

export default renderers
