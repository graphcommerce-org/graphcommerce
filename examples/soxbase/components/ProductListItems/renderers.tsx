import { makeStyles, Theme, Typography, TypographyProps } from '@material-ui/core'
import { ProductListItemRenderer } from '@reachdigital/magento-product'
import { ProductListItemBundle } from '@reachdigital/magento-product-bundle'
import { ProductListItemConfigurable } from '@reachdigital/magento-product-configurable'
import { ProductListItemDownloadable } from '@reachdigital/magento-product-downloadable'
import { ProductListItemGrouped } from '@reachdigital/magento-product-grouped'
import { ProductListItemSimple } from '@reachdigital/magento-product-simple'
import { ProductListItemVirtual } from '@reachdigital/magento-product-virtual'
import { ProductReviewChip } from '@reachdigital/magento-review'
import React from 'react'

const Subtitle = (props: TypographyProps) => (
  <Typography component='span' variant='caption' {...props} />
)

const useStyles = makeStyles((theme: Theme) => ({
  outlined: {
    backgroundColor: theme.palette.background.highlight,
  },
}))

const renderers: ProductListItemRenderer = {
  SimpleProduct: (props) => {
    const { outlined } = useStyles()
    const { rating_summary } = props
    return (
      <ProductListItemSimple
        {...props}
        subTitle={<Subtitle>BY SOXBASE</Subtitle>}
        aspectRatio={[1, 1]}
        bottomRight={<ProductReviewChip rating={rating_summary} classes={{ outlined }} />}
      />
    )
  },
  ConfigurableProduct: (props) => {
    const { rating_summary } = props
    const { outlined } = useStyles()

    return (
      <ProductListItemConfigurable
        {...props}
        subTitle={<Subtitle>BY SOXBASE</Subtitle>}
        aspectRatio={[1, 1]}
        swatchLocations={{
          topLeft: [],
          topRight: ['size'],
          bottomLeft: ['color'],
          bottomRight: [],
        }}
        bottomRight={<ProductReviewChip rating={rating_summary} classes={{ outlined }} />}
      />
    )
  },
  BundleProduct: (props) => {
    const { rating_summary } = props
    const { outlined } = useStyles()

    return (
      <ProductListItemBundle
        {...props}
        subTitle={<Subtitle>By Soxbase</Subtitle>}
        aspectRatio={[1, 1]}
        bottomRight={<ProductReviewChip rating={rating_summary} classes={{ outlined }} />}
      />
    )
  },
  VirtualProduct: (props) => {
    const { rating_summary } = props
    const { outlined } = useStyles()

    return (
      <ProductListItemVirtual
        {...props}
        subTitle={<Subtitle>BY SOXBASE</Subtitle>}
        aspectRatio={[1, 1]}
        bottomRight={<ProductReviewChip rating={rating_summary} classes={{ outlined }} />}
      />
    )
  },
  DownloadableProduct: (props) => {
    const { rating_summary } = props
    const { outlined } = useStyles()

    return (
      <ProductListItemDownloadable
        {...props}
        subTitle={<Subtitle>BY SOXBASE</Subtitle>}
        aspectRatio={[1, 1]}
        bottomRight={<ProductReviewChip rating={rating_summary} classes={{ outlined }} />}
      />
    )
  },
  GroupedProduct: (props) => {
    const { rating_summary } = props
    const { outlined } = useStyles()

    return (
      <ProductListItemGrouped
        {...props}
        subTitle={<Subtitle>BY SOXBASE</Subtitle>}
        aspectRatio={[1, 1]}
        bottomRight={<ProductReviewChip rating={rating_summary} classes={{ outlined }} />}
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
