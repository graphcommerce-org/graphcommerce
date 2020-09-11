import {
  makeStyles,
  Theme,
  createStyles,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
} from '@material-ui/core'
import Money from 'components/Money'
import { useCartQuery } from 'generated/apollo'
import React from 'react'
import RemoveItemFromCart from './RemoveItemFromCart'
import UpdateItemQuantity from './UpdateItemQuantity'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    productWrapper: {
      display: 'grid',
      gridTemplateColumns: '150px 1fr',
      backgroundColor: theme.palette.background.default,
      marginBottom: theme.spacings.md,
    },
    productImg: {
      gridColumn: 1,
      minHeight: 150,
      width: 150,
      backgroundColor: theme.palette.background.paper,
      backgroundSize: 'contain',
    },
    productRemove: {
      margin: theme.spacings.xs,
    },
    productContent: {
      gridColumn: 2,
      paddingBottom: 0,
    },
    productInfo: {},
    productName: {
      ...theme.typography.h5,
    },
    productDetails: {},
    divider: {
      gridColumn: '1 / 3',
      gridRow: 2,
    },
    productActions: {
      gridColumn: '1 / 3',
      gridRow: 3,
      display: 'flex',
      justifyContent: 'space-between',
    },
    productPrice: {
      flex: '1 1 50%',
    },
    productSubTotal: {
      flex: '1 1 50%',
      textAlign: 'right',
    },
  }),
)

export default function CartItem({
  id,
  quantity,
  product,
  prices,
  cartId,
}: GQLCartItemFragment & { cartId: string }) {
  const classes = useStyles()

  return (
    <Card className={classes.productWrapper}>
      {product?.thumbnail?.url && product.thumbnail.label && (
        <CardMedia
          className={classes.productImg}
          image={product.thumbnail.url}
          title={product.thumbnail.label}
        >
          <RemoveItemFromCart
            className={classes.productRemove}
            cartItemId={Number(id)}
            cartId={cartId}
          />
        </CardMedia>
      )}

      <CardContent className={classes.productContent}>
        <div className={classes.productInfo}>
          <div className={classes.productName}>{product.name}</div>
          <div className={classes.productDetails} />
        </div>
      </CardContent>

      <Divider className={classes.divider} />

      <CardActions className={classes.productActions}>
        {prices?.price && (
          <div className={classes.productPrice}>
            <Money {...prices.price} />
          </div>
        )}
        <UpdateItemQuantity cartItemId={Number(id)} cartId={cartId} quantity={quantity} />
        {prices?.row_total_including_tax && (
          <div className={classes.productSubTotal}>
            <Money {...prices.row_total_including_tax} />
          </div>
        )}
      </CardActions>
    </Card>
  )
}
