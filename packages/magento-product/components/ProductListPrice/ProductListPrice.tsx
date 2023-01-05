import { Money } from '@graphcommerce/magento-store'
import { extendableComponent } from '@graphcommerce/next-ui'
import { Typography, TypographyProps, Box } from '@mui/material'
import { ProductListPriceFragment } from './ProductListPrice.gql'

const { classes, selectors } = extendableComponent('ProductListPrice', [
  'root',
  'discountPrice',
] as const)

export type ProductListPriceProps = ProductListPriceFragment & Pick<TypographyProps, 'sx'>

export function ProductListPrice(props: ProductListPriceProps) {
  const { regular_price, final_price, sx } = props

  return (
    <Box
      sx={[{ typography: 'body1' }, ...(Array.isArray(sx) ? sx : [sx])]}
      className={classes.root}
    >
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
    </Box>
  )
}

ProductListPrice.selectors = selectors
