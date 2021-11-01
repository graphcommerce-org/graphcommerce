import { ProductListItemRenderer } from '@graphcommerce/magento-product'
import { ProductListItemBundle } from '@graphcommerce/magento-product-bundle'
import { ProductListItemConfigurable } from '@graphcommerce/magento-product-configurable'
import { ProductListItemDownloadable } from '@graphcommerce/magento-product-downloadable'
import { ProductListItemGrouped } from '@graphcommerce/magento-product-grouped'
import { ProductListItemSimple } from '@graphcommerce/magento-product-simple'
import { ProductListItemVirtual } from '@graphcommerce/magento-product-virtual'
import { ProductReviewChip } from '@graphcommerce/magento-review'
import { lighten, makeStyles, Theme, Typography, TypographyProps } from '@material-ui/core'
import React from 'react'

const Subtitle = (props: TypographyProps) => (
  <Typography component='span' variant='caption' {...props} />
)

const useStyles = makeStyles(
  (theme: Theme) => ({
    outlined: {
      color:
        theme.palette.type === 'light'
          ? theme.palette.text.primary
          : theme.palette.background.default,
      borderColor:
        theme.palette.type === 'light'
          ? theme.palette.divider
          : lighten(theme.palette.background.default, 0.9),
      backgroundColor: theme.palette.background.image,
    },
  }),
  { name: 'outlined' },
)

const renderers: ProductListItemRenderer = {
  SimpleProduct: (props) => {
    const { outlined } = useStyles()
    const { rating_summary } = props
    return (
      <ProductListItemSimple
        {...props}
        subTitle={<Subtitle>BY GC</Subtitle>}
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
        subTitle={<Subtitle>BY GC</Subtitle>}
        aspectRatio={[1, 1]}
        swatchLocations={{
          topLeft: [],
          topRight: [], // ['size']
          bottomLeft: [],
          bottomRight: ['dominant_color'],
        }}
        bottomLeft={<ProductReviewChip rating={rating_summary} classes={{ outlined }} />}
      />
    )
  },
  BundleProduct: (props) => {
    const { rating_summary } = props
    const { outlined } = useStyles()

    return (
      <ProductListItemBundle
        {...props}
        subTitle={<Subtitle>BY GC</Subtitle>}
        aspectRatio={[1, 1]}
        bottomLeft={<ProductReviewChip rating={rating_summary} classes={{ outlined }} />}
      />
    )
  },
  VirtualProduct: (props) => {
    const { rating_summary } = props
    const { outlined } = useStyles()

    return (
      <ProductListItemVirtual
        {...props}
        subTitle={<Subtitle>BY GC</Subtitle>}
        aspectRatio={[1, 1]}
        bottomLeft={<ProductReviewChip rating={rating_summary} classes={{ outlined }} />}
      />
    )
  },
  DownloadableProduct: (props) => {
    const { rating_summary } = props
    const { outlined } = useStyles()

    return (
      <ProductListItemDownloadable
        {...props}
        subTitle={<Subtitle>BY GC</Subtitle>}
        aspectRatio={[1, 1]}
        bottomLeft={<ProductReviewChip rating={rating_summary} classes={{ outlined }} />}
      />
    )
  },
  GroupedProduct: (props) => {
    const { rating_summary } = props
    const { outlined } = useStyles()

    return (
      <ProductListItemGrouped
        {...props}
        subTitle={<Subtitle>BY GC</Subtitle>}
        aspectRatio={[1, 1]}
        bottomLeft={<ProductReviewChip rating={rating_summary} classes={{ outlined }} />}
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
