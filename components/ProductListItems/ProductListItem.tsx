import { Typography, makeStyles, Theme, Link as MuiLink } from '@material-ui/core'
import clsx from 'clsx'
import PictureResponsiveSharp from 'components/PictureResponsiveSharp'
import { vpCalc, UseStyles } from 'components/Theme'
import { m as motion } from 'framer-motion'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import ProductListPrice from '../ProductListPrice'

export const useProductListItemStyles = makeStyles(
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
      objectFit: 'contain',
      position: 'absolute',
      top: 0,
      left: 0,
      background: '#fff',
    },
    link: {
      textDecoration: 'underline',
    },
  }),
  { name: 'ProductListItemSimple' },
)

export type ProductListItemProps = PropsWithChildren<
  GQLProductListItemSimpleFragment & UseStyles<typeof useProductListItemStyles>
>

export default function ProductListItem(props: ProductListItemProps) {
  const { small_image, url_key, name, price_range, children, sku } = props
  const classes = useProductListItemStyles(props)

  return (
    <div className={classes.item}>
      <Link href='/product/[url]' as={`/product/${url_key}`} passHref>
        <MuiLink underline='none'>
          <motion.div className={classes.imageContainer} layoutId={sku ?? ''}>
            {small_image ? (
              <PictureResponsiveSharp
                alt={small_image.label ?? ''}
                width={320}
                height={320}
                src={small_image.url ?? ''}
                type='image/jpeg'
                className={classes.image}
              />
            ) : (
              <div className={clsx(classes.placeholder, classes.image)}>GEEN AFBEELDING</div>
            )}
          </motion.div>

          <Typography component='h2' className={classes.title}>
            {name}
          </Typography>
        </MuiLink>
      </Link>
      <ProductListPrice {...price_range.minimum_price} />
      {children}
    </div>
  )
}
