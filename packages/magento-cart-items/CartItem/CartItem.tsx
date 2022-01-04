import { Image } from '@graphcommerce/image'
import { useDisplayInclTax } from '@graphcommerce/magento-cart'
import { useProductLink } from '@graphcommerce/magento-product'
import { Money } from '@graphcommerce/magento-store'
import { UseStyles, responsiveVal } from '@graphcommerce/next-ui'
import { Badge, Theme, Link } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import clsx from 'clsx'
import PageLink from 'next/link'
import React, { PropsWithChildren } from 'react'
import { CartItemFragment } from '../Api/CartItem.gql'
import RemoveItemFromCartFab from '../RemoveItemFromCart/RemoveItemFromCartFab'
import UpdateItemQuantity from '../UpdateItemQuantity/UpdateItemQuantity'

const rowImageSize = responsiveVal(70, 125)

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'grid',
      gridTemplate: `
      "picture itemName itemName itemName"
      "picture itemOptions itemOptions itemOptions"
      "picture itemPrice quantity rowPrice"
        `,
      gridTemplateColumns: `${rowImageSize} 1fr minmax(120px, 1fr) 1fr`,
      columnGap: theme.spacings.sm,
      alignItems: 'baseline',
      ...theme.typography.body1,
      marginBottom: theme.spacings.lg,
      marginTop: theme.spacings.md,
      [theme.breakpoints.up('sm')]: {
        gridTemplate: `
        "picture itemName itemName itemName itemName"
        "picture itemOptions itemPrice quantity rowPrice"
      `,
        gridTemplateColumns: `${rowImageSize} 4fr 1fr minmax(120px, 1fr) minmax(75px, 1fr)`,
        marginBottom: theme.spacings.md,
      },
    },
    itemWithoutOptions: {
      display: 'grid',
      gridTemplate: `
      "picture itemName itemName itemName"
      "picture itemPrice quantity rowPrice"`,
      alignItems: 'center',
      gridTemplateColumns: `${rowImageSize} 1fr minmax(120px, 1fr) 1fr`,
      [theme.breakpoints.up('sm')]: {
        gridTemplate: `
        "picture itemName itemPrice quantity rowPrice"
      `,
        gridTemplateColumns: `${rowImageSize} 4fr 1fr minmax(120px, 1fr) minmax(75px, 1fr)`,
      },
    },
    picture: {
      gridArea: 'picture',
      width: rowImageSize,
      height: rowImageSize,
      padding: responsiveVal(5, 10),
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: '50%',
      alignSelf: 'center',
    },
    badge: {
      '& > button': {
        background: theme.palette.background.paper,
        '&:hover, &:active, &:visited': {
          background: theme.palette.background.paper,
        },
        [theme.breakpoints.down('md')]: {
          width: 30,
          height: 30,
          minHeight: 'unset',
        },
      },
    },
    productLink: {
      display: 'block',
      width: '100%',
      borderRadius: '50%',
      overflow: 'hidden',
    },
    image: {
      gridColumn: 1,
      backgroundColor: theme.palette.background.image,
      objectFit: 'cover',
      display: 'block',
      width: '110% !important',
      height: '110% !important',
      marginLeft: '-5%',
      marginTop: '-5%',
    },
    itemName: {
      ...theme.typography.subtitle1,
      fontWeight: theme.typography.fontWeightBold,
      gridArea: 'itemName',
      color: theme.palette.text.primary,
      textDecoration: 'none',
      flexWrap: 'nowrap',
      maxWidth: 'max-content',
    },
    itemNameWithOptions: {
      ...theme.typography.subtitle1,
      fontWeight: theme.typography.fontWeightBold,
      alignSelf: 'flex-end',
    },
    itemPrice: {
      gridArea: 'itemPrice',
      textAlign: 'left',
      color: theme.palette.text.secondary,
      alignSelf: 'center',
      [theme.breakpoints.up('sm')]: {
        alignSelf: 'flex-start',
      },
    },
    quantity: {
      gridArea: 'quantity',
      justifySelf: 'right',
      transform: 'translateY(0)',
      [theme.breakpoints.up('sm')]: {
        transform: 'translateY(-6px)',
      },
    },
    rowPrice: {
      gridArea: 'rowPrice',
      textAlign: 'right',
      alignSelf: 'center',
      [theme.breakpoints.up('sm')]: {
        alignSelf: 'flex-start',
      },
    },
    cellNoOptions: {
      textAlign: 'left',
    },
  }),
  { name: 'CartItem' },
)

export type CartItemProps = PropsWithChildren<CartItemFragment> &
  UseStyles<typeof useStyles> & { withOptions?: boolean }

export default function CartItem(props: CartItemProps) {
  const { product, uid, prices, quantity, children, withOptions } = props
  const { name } = product
  const classes = useStyles()
  const productLink = useProductLink(product)
  const inclTaxes = useDisplayInclTax()

  return (
    <div className={clsx(classes.root, !withOptions && classes.itemWithoutOptions)}>
      <Badge
        color='default'
        badgeContent={<RemoveItemFromCartFab uid={uid} className={classes.badge} />}
        component='div'
        className={classes.picture}
        overlap='circular'
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <PageLink href={productLink}>
          <a className={classes.productLink}>
            {product?.thumbnail?.url && (
              <Image
                src={product.thumbnail.url ?? ''}
                layout='fill'
                alt={product.thumbnail.label ?? product.name ?? ''}
                sizes={responsiveVal(70, 125)}
                className={classes.image}
              />
            )}
          </a>
        </PageLink>
      </Badge>

      <PageLink href={productLink}>
        <Link
          variant='body1'
          className={clsx(classes.itemName, withOptions && classes.itemNameWithOptions)}
          underline='hover'
        >
          {name}
        </Link>
      </PageLink>

      <div className={classes.itemPrice}>
        {inclTaxes ? (
          <Money
            value={(prices?.row_total_including_tax?.value ?? 0) / quantity}
            currency={prices?.price.currency}
          />
        ) : (
          <Money {...prices?.price} />
        )}
      </div>

      <div className={classes.quantity}>
        <UpdateItemQuantity uid={uid} quantity={quantity} />
      </div>

      <div className={classes.rowPrice}>
        <Money {...(inclTaxes ? prices?.row_total_including_tax : prices?.row_total)} /> <br />
      </div>

      {children}
    </div>
  )
}
