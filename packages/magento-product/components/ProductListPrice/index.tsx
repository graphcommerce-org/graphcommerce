import { Money } from '@graphcommerce/magento-store'
import { UseStyles } from '@graphcommerce/next-ui'
import { Theme, Typography } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import React from 'react'
import { ProductListPriceFragment } from './ProductListPrice.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    root: {},
    discount: {
      textDecoration: 'line-through',
      color: theme.palette.text.disabled,
      display: 'inline',
      marginRight: 8,
    },
  }),
  { name: 'ProductListPrice' },
)

type ProductListPriceProps = ProductListPriceFragment & UseStyles<typeof useStyles>

export default function ProductListPrice(props: ProductListPriceProps) {
  const { regular_price, final_price } = props
  const classes = useStyles(props)

  return (
    <Typography component='div' variant='body1' className={classes.root}>
      {regular_price.value !== final_price.value && (
        <div className={classes.discount}>
          <Money {...regular_price} />
        </div>
      )}
      <Money {...final_price} />
    </Typography>
  )
}
