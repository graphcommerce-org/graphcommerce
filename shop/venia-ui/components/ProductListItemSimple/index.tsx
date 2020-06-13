import React, { PropsWithChildren } from 'react'

import { Typography, makeStyles, Theme } from '@material-ui/core'
import Link from 'components/Link'
import { vpCalc, UseStyles } from 'components/Theme'
import PictureResponsive from 'components/PictureResponsive'
import clsx from 'clsx'
import Money from '../Money'
import ProductPrice from '../ProductPrice'

export const useProductListItemSimpleStyles = makeStyles(
  (theme: Theme) => ({
    item: {
      position: 'relative',
      ...theme.typography.body1,
    },
    title: {
      color: theme.palette.primary.contrastText,
      ...theme.typography.h4,
      margin: `0 0 ${theme.spacings.sm}`,
    },
    imageContainer: {
      display: 'block',
      position: 'relative',
      marginBottom: '50px',
      height: vpCalc(120, 200),
      '&::before': {
        content: '""',
        height: '100%',
        width: '100%',
        position: 'absolute',
        display: 'block',
        boxShadow: '0 30px 60px 0 rgba(0, 0, 0, 0.25)',
        transform: 'scale(.85, 0.95)',
        top: 0,
        left: 0,
      },
      paddingTop: 'calc(100% / 3 * 2)',
    },
    placeholder: {
      display: 'flex',
      textAlign: 'center',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      ...theme.typography.body2,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.background.default,
      fontWeight: 600,
      userSelect: 'none',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      position: 'absolute',
      top: 0,
      left: 0,
    },
    link: {
      textDecoration: 'underline',
    },
  }),
  { name: 'ProductListItemSimple' },
)

type ProductListItemSimpleProps = PropsWithChildren<
  GQLProductListItemSimpleFragment & UseStyles<typeof useProductListItemSimpleStyles>
>

export default function ProductListItemSimple(props: ProductListItemSimpleProps) {
  const { small_image, url_key, name, price_range, children, sku } = props
  const classes = useProductListItemSimpleStyles(props)

  return (
    <div className={classes.item}>
      <Link href={`/shop/view/${url_key}`} metaRobots='INDEX_FOLLOW' underline='none'>
        <div className={classes.imageContainer}>
          {small_image ? (
            <PictureResponsive
              alt={small_image.label}
              width={320}
              height={320}
              srcSets={{ 'image/jpeg': small_image.url }}
              className={classes.image}
            />
          ) : (
            <div className={clsx(classes.placeholder, classes.image)}>GEEN AFBEELDING</div>
          )}
        </div>

        <Typography component='h2' className={classes.title}>
          {name} {sku}
        </Typography>
      </Link>
      <ProductPrice {...price_range.minimum_price} />
      {children}
    </div>
  )
}
