import { makeStyles, Theme } from '@material-ui/core'
import { Money } from '@reachdigital/magento-store'
import { UseStyles } from '@reachdigital/next-ui'
import React from 'react'
import { ProductListPriceFragment } from './ProductListPrice.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
    discount: {
      textDecoration: 'line-through',
      color: theme.palette.primary.mutedText,
      display: 'inline',
      marginRight: 8,
      ...theme.typography.caption,
    },
  }),
  { name: 'ProductListPrice' },
)

type ProductListPriceProps = ProductListPriceFragment & UseStyles<typeof useStyles>

export default function ProductListPrice(props: ProductListPriceProps) {
  const { regular_price, final_price } = props
  const classes = useStyles(props)

  return (
    <div className={classes.root}>
      {regular_price.value !== final_price.value && (
        <div className={classes.discount}>
          <Money {...regular_price} />
        </div>
      )}
      <Money {...final_price} />
    </div>
  )
}
