import { SignedInMask } from '@graphcommerce/magento-customer'
import { Money } from '@graphcommerce/magento-store'
import { extendableComponent } from '@graphcommerce/next-ui'
import { Typography, TypographyProps } from '@mui/material'
import { ProductListPriceFragment } from './ProductListPrice.gql'

export const productListPrice = extendableComponent('ProductListPrice', [
  'root',
  'finalPrice',
  'discountPrice',
] as const)

const { classes, selectors } = productListPrice

export type ProductListPriceProps = ProductListPriceFragment & Pick<TypographyProps, 'sx'>

export function ProductListPrice(props: ProductListPriceProps) {
  const { regular_price, final_price, sx } = props

  return (
    <Typography component='div' variant='body1' className={classes.root} sx={sx}>
      {regular_price.value !== final_price.value && (
        <SignedInMask
          component='span'
          sx={{
            textDecoration: 'line-through',
            color: 'text.disabled',
            marginRight: '8px',
          }}
          skeleton={{ width: '3.5em' }}
          className={classes.discountPrice}
        >
          <Money {...regular_price} />
        </SignedInMask>
      )}
      <SignedInMask className={classes.finalPrice} component='span' skeleton={{ width: '3.5em' }}>
        <Money {...final_price} />
      </SignedInMask>
    </Typography>
  )
}

ProductListPrice.selectors = selectors
