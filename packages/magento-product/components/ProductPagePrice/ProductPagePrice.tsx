import { useWatch } from '@graphcommerce/ecommerce-ui'
import { PrivateQueryMask } from '@graphcommerce/graphql'
import { Money } from '@graphcommerce/magento-store'
import { extendableComponent, sxx } from '@graphcommerce/next-ui'
import { Box, type SxProps, type Theme } from '@mui/material'
import type { AddToCartItemSelector } from '../AddProductsToCart'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import { getProductTierPrice } from './getProductTierPrice'
import type { ProductPagePriceFragment } from './ProductPagePrice.gql'
import type { UseCustomizableOptionPriceProps } from './useCustomizableOptionPrice'
import { useCustomizableOptionPrice } from './useCustomizableOptionPrice'

export type ProductPagePriceProps = {
  product: ProductPagePriceFragment
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  sx?: SxProps<Theme>
  variant?: 'item' | 'total'
  asNumber?: boolean
} & AddToCartItemSelector &
  UseCustomizableOptionPriceProps

const { classes } = extendableComponent('ProductPagePrice', [
  'finalPrice',
  'discountPrice',
  'prefix',
  'suffix',
] as const)

export function ProductPagePrice(props: ProductPagePriceProps) {
  const { product, index = 0, prefix, suffix, sx, variant = 'item', asNumber } = props

  const { control } = useFormAddProductsToCart()
  const quantity = useWatch({ control, name: `cartItems.${index}.quantity` })
  const price =
    getProductTierPrice(product, quantity) ?? product.price_range.minimum_price.final_price

  const priceValue = useCustomizableOptionPrice(props) ?? 0
  const finalPriceValue = variant === 'total' ? priceValue * quantity : priceValue
  const regularPrice = product.price_range.minimum_price.regular_price
  const regularPriceValue =
    variant === 'total' ? (regularPrice.value ?? 0) * quantity : regularPrice.value

  return (
    <Box component='span' sx={sxx({ display: 'inline-flex', columnGap: '0.3em' }, sx)}>
      {prefix && (
        <PrivateQueryMask
          component='span'
          className={classes.prefix}
          sx={{ '&:empty': { display: 'none' } }}
          skeleton={{ variant: 'text', sx: { width: '3.5em', transform: 'none' } }}
        >
          {prefix}
        </PrivateQueryMask>
      )}
      {regularPrice.value !== price.value && (
        <PrivateQueryMask
          component='span'
          className={classes.discountPrice}
          skeleton={{ variant: 'text', sx: { width: '3.5em', transform: 'none' } }}
          sx={[{ textDecoration: 'line-through', color: 'text.disabled' }]}
        >
          <Money {...regularPrice} value={regularPriceValue} asNumber={asNumber} />
        </PrivateQueryMask>
      )}
      <PrivateQueryMask
        component='span'
        skeleton={{ variant: 'text', sx: { width: '3.5em', transform: 'none' } }}
        className={classes.finalPrice}
      >
        <Money {...price} value={finalPriceValue} asNumber={asNumber} />
      </PrivateQueryMask>

      {suffix && (
        <PrivateQueryMask
          component='span'
          className={classes.suffix}
          sx={{ '&:empty': { display: 'none' } }}
          skeleton={{ variant: 'text', sx: { width: '3.5em', transform: 'none' } }}
        >
          {suffix}
        </PrivateQueryMask>
      )}
    </Box>
  )
}
