import { Money } from '@graphcommerce/magento-store'
import { extendableComponent } from '@graphcommerce/next-ui'
import { Typography, TypographyProps, Box } from '@mui/material'
import { ProductListPriceFragment } from './ProductListPrice.gql'

export const productListPrice = extendableComponent('ProductListPrice', [
  'root',
  'discountPrice',
] as const)

const { classes, selectors } = productListPrice

export type ProductListPriceProps = ProductListPriceFragment & Pick<TypographyProps, 'sx'>

export function ProductListPrice(props: ProductListPriceProps) {
  const { regular_price, final_price, sx } = props

  return (
    <Typography component='div' variant='body1' className={classes.root} sx={sx}>
      {regular_price.value !== final_price.value && (
        <Box
          component='span'
          sx={{
            textDecoration: 'line-through',
            color: 'text.disabled',
            marginRight: '8px',
          }}
          className={classes.discountPrice}
        >
          <Money {...regular_price} />
        </Box>
      )}
      <Money {...final_price} />
    </Typography>
  )
}

ProductListPrice.selectors = selectors
