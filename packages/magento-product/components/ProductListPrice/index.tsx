import { Money } from '@graphcommerce/magento-store'
import { componentSlots } from '@graphcommerce/next-ui'
import { Typography, TypographyProps, Box } from '@mui/material'
import { ProductListPriceFragment } from './ProductListPrice.gql'

const { componentName, classes, selectors } = componentSlots('ProductListPrice', [
  'discountPrice',
] as const)

type ProductListPriceProps = ProductListPriceFragment & Pick<TypographyProps, 'sx'>

export default function ProductListPrice(props: ProductListPriceProps) {
  const { regular_price, final_price, sx } = props

  return (
    <Typography component='div' variant='body1' className={componentName} sx={sx}>
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
