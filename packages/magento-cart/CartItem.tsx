import {
  makeStyles,
  Theme,
  createStyles,
  Card,
  CardContent,
  CardActions,
  Divider,
} from '@material-ui/core'
import Money from '@reachdigital/magento-store/Money'
import PictureResponsiveSharp from '@reachdigital/next-ui/PictureResponsiveSharp'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import React from 'react'
import { CartItemFragment } from './CartItem.gql'
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
      width: responsiveVal(100, 150),
      height: 'auto',
      backgroundColor: theme.palette.background.paper,
      objectFit: 'contain',
      display: 'block',
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
      ...theme.typography.body1,
    },
    productSubTotal: {
      flex: '1 1 50%',
      textAlign: 'right',
      ...theme.typography.body1,
    },
  }),
)

export default function CartItem({
  id,
  quantity,
  product,
  prices,
  cartId,
}: CartItemFragment & { cartId: string }) {
  const classes = useStyles()

  return (
    <Card className={classes.productWrapper}>
      {product?.thumbnail?.url && product.thumbnail.label && (
        <PictureResponsiveSharp
          alt={product.thumbnail.label ?? ''}
          width={104}
          height={86}
          src={product.thumbnail.url ?? ''}
          type='image/jpeg'
          className={classes.productImg}
        />
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
