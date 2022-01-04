import { Image, ImageProps } from '@graphcommerce/image'
import { responsiveVal, UseStyles } from '@graphcommerce/next-ui'
import { ButtonBase, Theme, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import clsx from 'clsx'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React, { PropsWithChildren, useCallback } from 'react'
import { ProductListItemFragment } from '../../Api/ProductListItem.gql'
import { useProductLink } from '../../hooks/useProductLink'
import ProductListPrice from '../ProductListPrice'

export const useProductListItemStyles = makeStyles(
  (theme: Theme) => ({
    buttonBase: {
      display: 'block',
    },
    item: {
      position: 'relative',
      height: '100%',
    },
    title: {
      display: 'inline',
      color: theme.palette.text.primary,
      overflowWrap: 'break-word',
      wordBreak: 'break-all',
      maxWidth: '100%',
      marginRight: responsiveVal(3, 5),
      gridArea: 'title',
      fontWeight: theme.typography.fontWeightBold,
    },
    itemTitleContainer: {
      display: 'grid',
      gridTemplateColumns: 'unset',
      alignItems: 'baseline',
      marginTop: theme.spacings.xs,
      columnGap: 4,
      gridTemplateAreas: `
        "title title"
        "subtitle price"
      `,
      justifyContent: 'space-between',
      [theme.breakpoints.up('md')]: {
        gridTemplateAreas: `"title subtitle price"`,
        gridTemplateColumns: 'auto auto 1fr',
      },
    },
    subtitle: {
      gridArea: 'subtitle',
    },
    price: {
      gridArea: 'price',
      textAlign: 'right',
      [theme.breakpoints.up('sm')]: {
        justifySelf: 'flex-end',
      },
    },
    overlayItems: {
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
        gap: 0,
        // whiteSpace: 'nowrap',
      },
    },
    imageContainer: ({ aspectRatio = [4, 3] }: BaseProps) => ({
      display: 'block',
      height: 0, // https://stackoverflow.com/questions/44770074/css-grid-row-height-safari-bug
      position: 'relative',
      paddingTop: `calc(100% / ${aspectRatio[0]} * ${aspectRatio[1]})`,
      background: theme.palette.background.image, // theme specific,
      borderRadius: responsiveVal(theme.shape.borderRadius * 2, theme.shape.borderRadius * 3),
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
      ...theme.typography.caption,
      background: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightBold,
      border: `1px solid ${theme.palette.divider}`,
      padding: '0px 6px',
      color: theme.palette.background.default,
      display: 'inline-block',
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
  const { locale } = useRouter()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const format = useCallback(
    new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 1 }).format,
    [],
  )

  return (
    <PageLink href={productLink} passHref>
      <ButtonBase classes={{ root: clsx(classes.buttonBase, classes.item) }} component='a'>
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
            <div className={clsx(classes.placeholder, classes.image)}>NO IMAGE</div>
          )}

          {!imageOnly && (
            <div className={classes.overlayItems}>
              <div className={classes.overlayItem}>
                {discount > 0 && <div className={classes.discount}>{format(discount / -100)}</div>}
                {topLeft}
              </div>
              <div className={clsx(classes.overlayItem, classes.cellAlignRight)}>{topRight}</div>
              <div className={clsx(classes.overlayItem, classes.cellAlignBottom)}>{bottomLeft}</div>
              <div className={clsx(classes.cellAlignBottom, classes.cellAlignRight)}>
                {bottomRight}
              </div>
            </div>
          )}
        </div>

        {!imageOnly && (
          <>
            <div className={classes.itemTitleContainer}>
              <Typography component='h2' variant='subtitle1' className={classes.title}>
                {name}
              </Typography>
              <div className={classes.subtitle}>{subTitle}</div>

              <ProductListPrice {...price_range.minimum_price} classes={{ root: classes.price }} />
            </div>
            {children}
          </>
        )}
      </ButtonBase>
    </PageLink>
  )
}
