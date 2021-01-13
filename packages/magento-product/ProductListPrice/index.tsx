import { makeStyles, Theme } from '@material-ui/core'
import Money from '@reachdigital/magento-store/Money'
import React from 'react'
import { ProductListPriceFragment } from './ProductListPrice.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    discount: {
      textDecoration: 'line-through',
      color: theme.palette.primary.mutedText,
      display: 'inline',
      marginRight: 8,
      ...theme.typography.caption,
    },
    price: {
      [theme.breakpoints.down('xs')]: {
        position: 'absolute',
        right: 0,
      },
    },
  }),
  { name: 'ProductListPrice' },
)

export default function ProductListPrice(props: ProductListPriceFragment) {
  const { regular_price, final_price } = props
  const classes = useStyles(props)

  return (
    <div className={classes.price}>
      {regular_price.value !== final_price.value && (
        <div className={classes.discount}>
          <Money {...regular_price} />
        </div>
      )}
      <Money {...final_price} />
    </div>
  )
}
