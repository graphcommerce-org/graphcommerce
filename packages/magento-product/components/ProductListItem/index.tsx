import { Link as MuiLink, makeStyles, Theme, Typography } from '@material-ui/core'
import { Image, ImageProps } from '@reachdigital/image'
import { UseStyles, responsiveVal } from '@reachdigital/next-ui'
import clsx from 'clsx'
import PageLink from 'next/link'
import React, { PropsWithChildren } from 'react'
import { ProductListItemFragment } from '../../Api/ProductListItem.gql'
import { useProductLink } from '../../hooks/useProductLink'
import ProductListPrice from '../ProductListPrice'

export const useProductListItemStyles = makeStyles(
  (theme: Theme) => ({
    item: {
      position: 'relative',
      ...theme.typography.h6,
      fontWeight: 'inherit',
      height: '100%',
    },
    title: {
      ...theme.typography.h6,
      display: 'inline',
      color: theme.palette.text.primary,
      overflowWrap: 'break-word',
      wordBreak: 'break-all',
      maxWidth: '100%',
      marginRight: responsiveVal(3, 5),
      gridArea: 'title',
    },
    itemTitleContainer: {
      display: 'grid',
      gridTemplateColumns: 'unset',
      gap: responsiveVal(3, 6),
      margin: `${responsiveVal(6, 16)} 0`,
      marginBottom: responsiveVal(4, 8),
      gridTemplateAreas: `
        "title title"
        "subtitle price"
      `,
      justifyContent: 'space-between',
      [theme.breakpoints.up('md')]: {
        gridTemplateAreas: `
        "title subtitle price"
      `,
        gridTemplateColumns: 'auto auto 1fr',
      },
    },
    subtitle: {
      gridArea: 'subtitle',
    },
    price: {
      gridArea: 'price',
      [theme.breakpoints.up('sm')]: {
        justifySelf: 'flex-end',
      },
    },
    imageContainerOverlayGrid: {
      display: 'grid',
      gridTemplateAreas: `
          "topLeft topRight"
          "bottomLeft bottomRight"
      `,
      position: 'absolute',
      top: 0,
      width: '100%',
      height: '100%',
      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
      padding: responsiveVal(8, 12),
      color: theme.palette.text.primary,
    },
    cellAlignRight: {
      justifySelf: 'end',
      textAlign: 'right',
    },
    cellAlignBottom: {
      alignSelf: 'flex-end',
    },
    overlayItem: {
      '& div': {
        margin: `${responsiveVal(3, 5)} 0`,
        gap: 0,
        whiteSpace: 'nowrap',
        fontSize: 12,
      },
    },
    imageContainer: ({ aspectRatio = [4, 3] }: BaseProps) => ({
      display: 'block',
      height: 0, // https://stackoverflow.com/questions/44770074/css-grid-row-height-safari-bug
      position: 'relative',
      paddingTop: `calc(100% / ${aspectRatio[0]} * ${aspectRatio[1]})`,
      background: theme.palette.background.highlight, // thema specifiek
      borderRadius: 2,
    }),
    placeholder: {
      display: 'flex',
      textAlign: 'center',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.palette.background.default,
      fontWeight: 600,
      userSelect: 'none',
    },
    image: {
      objectFit: 'contain',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    link: {
      textDecoration: 'underline',
    },
    discount: {
      background: theme.palette.text.primary,
      padding: '5px 6px 4px 6px',
      color: '#fff',
      display: 'inline',
      borderRadius: 2,
      ...theme.typography.h6,
    },
  }),
  { name: 'ProductListItem' },
)

export type OverlayAreaKeys = 'topLeft' | 'bottomLeft' | 'topRight' | 'bottomRight'

export type OverlayAreas = Partial<Record<OverlayAreaKeys, React.ReactNode>>

type BaseProps = PropsWithChildren<
  {
    subTitle?: React.ReactNode
    aspectRatio?: [number, number]
    imageOnly?: boolean
  } & OverlayAreas &
    ProductListItemFragment &
    Pick<ImageProps, 'loading' | 'sizes' | 'dontReportWronglySizedImages'>
>

export type ProductListItemProps = BaseProps & UseStyles<typeof useProductListItemStyles>

export default function ProductListItem(props: ProductListItemProps) {
  const {
    subTitle,
    topLeft,
    topRight,
    bottomLeft,
    bottomRight,
    small_image,
    name,
    price_range,
    children,
    imageOnly = false,
    loading,
    sizes,
    dontReportWronglySizedImages,
  } = props
  const classes = useProductListItemStyles(props)
  const productLink = useProductLink(props)
  const discount = Math.floor(price_range.minimum_price.discount?.percent_off ?? 0)

  return (
    <div className={classes.item}>
      <PageLink href={productLink} passHref>
        <MuiLink underline='none'>
          <div className={classes.imageContainer}>
            {small_image ? (
              <Image
                layout='fill'
                sizes={sizes}
                dontReportWronglySizedImages={dontReportWronglySizedImages}
                src={small_image.url ?? ''}
                alt={small_image.label ?? ''}
                className={classes.image}
                loading={loading}
              />
            ) : (
              <div className={clsx(classes.placeholder, classes.image)}>GEEN AFBEELDING</div>
            )}

            <div className={classes.imageContainerOverlayGrid}>
              <div className={classes.overlayItem}>
                {discount > 0 && <div className={classes.discount}>{`- ${discount}%`}</div>}
                {topLeft}
              </div>
              <div className={clsx(classes.overlayItem, classes.cellAlignRight)}>{topRight}</div>
              <div className={clsx(classes.overlayItem, classes.cellAlignBottom)}>{bottomLeft}</div>
              <div className={clsx(classes.cellAlignBottom, classes.cellAlignRight)}>
                {bottomRight}
              </div>
            </div>
          </div>
        </MuiLink>
      </PageLink>

      {!imageOnly && (
        <>
          <div className={classes.itemTitleContainer}>
            {/* <div> */}
            <Typography component='h2' className={classes.title}>
              {name}
            </Typography>
            {/* </div> */}
            <div className={classes.subtitle}>{subTitle}</div>
            <ProductListPrice {...price_range.minimum_price} classes={{ root: classes.price }} />
          </div>

          {children}
        </>
      )}
    </div>
  )
}
