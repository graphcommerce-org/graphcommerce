import { Typography, makeStyles, Theme, Link as MuiLink } from '@material-ui/core'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import { UseStyles } from '@reachdigital/next-ui/Styles'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import clsx from 'clsx'
import React, { PropsWithChildren } from 'react'
import { useProductLink } from './ProductLink'
import { ProductListItemFragment } from './ProductListItem.gql'
import ProductListPrice from './ProductListPrice'

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
      height: responsiveVal(120, 300),
      paddingTop: 'calc(100% / 3 * 2)',
      background: 'rgba(0, 0, 0, 0.04)',
      '&::before': {
        content: '""',
        height: '100%',
        width: '100%',
        position: 'absolute',
        display: 'block',
        transform: 'scale(.85, 0.95)',
        top: 0,
        left: 0
      }
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
    },
    link: {
      textDecoration: 'underline',
    },
  }),
  { name: 'ProductListItemSimple' },
)

export type ProductListItemProps = PropsWithChildren<
  ProductListItemFragment & UseStyles<typeof useProductListItemStyles>
>

export default function ProductListItem(props: ProductListItemProps) {
  const { small_image, name, price_range, children } = props
  const classes = useProductListItemStyles(props)
  const productLink = useProductLink(props)

  return (
    <div className={classes.item}>
      <PageLink href={productLink}>
        <MuiLink underline='none'>
          <div className={classes.imageContainer}>
            {small_image ? (
              <PictureResponsiveNext
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
          </div>

          <Typography component='h2' className={classes.title}>
            {name}
          </Typography>
        </MuiLink>
      </PageLink>
      <ProductListPrice {...price_range.minimum_price} />
      {children}
    </div>
  )
}
