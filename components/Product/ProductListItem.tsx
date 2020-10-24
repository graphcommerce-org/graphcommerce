import { Typography, makeStyles, Theme, Link as MuiLink } from '@material-ui/core'
import clsx from 'clsx'
import PageLink from 'components/PageTransition/PageLink'
import PictureResponsiveSharp from 'components/PictureResponsiveSharp'
import { UseStyles } from 'components/Styles'
import responsiveVal from 'components/Styles/responsiveVal'
import React, { PropsWithChildren } from 'react'
import { useProductLink } from './ProductLink'
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
      display: 'inline',
      marginRight: '20px',
    },
    imageContainer: {
      display: 'block',
      position: 'relative',
      marginBottom: '20px',
      border: '1px solid #efefef',
      height: responsiveVal(180, 380),
      '&::before': {
        content: '""',
        height: '100%',
        width: '100%',
        position: 'absolute',
        display: 'block',
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
    },
    link: {
      textDecoration: 'underline',
    },
  }),
  { name: 'ProductListItemSimple' },
)

export type ProductListItemProps = PropsWithChildren<
  GQLProductListItemSimpleFragment & UseStyles<typeof useProductListItemStyles> & { isbig: number }
>

export default function ProductListItem(props: ProductListItemProps) {
  const { small_image, name, price_range, children, isbig } = props
  const classes = useProductListItemStyles(props)
  const productLink = useProductLink(props)

  return (
    <div className={clsx(classes.item, isbig && 'big')}>
      <PageLink href={productLink}>
        <MuiLink underline='none'>
          <div className={clsx(classes.imageContainer, isbig && 'bigimg')}>
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
