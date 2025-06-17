import { filterNonNullableKeys, sxx } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import { Box, type SxProps, type Theme } from '@mui/material'
import { type AddToCartItemSelector } from '../AddProductsToCart'
import { ProductListPrice } from '../ProductListPrice'
import { type ProductPagePriceFragment } from './ProductPagePrice.gql'
import type { UseCustomizableOptionPriceProps } from './useCustomizableOptionPrice'

export type ProductPagePriceLowestProps = {
  sx?: SxProps<Theme>
  product: ProductPagePriceFragment
} & AddToCartItemSelector &
  UseCustomizableOptionPriceProps

export function ProductPagePriceLowest(props: ProductPagePriceLowestProps) {
  const { product, sx, index = 0 } = props
  const priceTiers = filterNonNullableKeys(product.price_tiers, ['quantity', 'final_price'])
  const lastTier = priceTiers[priceTiers.length - 1]

  const lowestTier = (lastTier?.final_price.value ?? 0) / (lastTier?.quantity ?? 1)
  const finalPrice = lowestTier
    ? {
        value: lowestTier,
        currency: product.price_range.minimum_price.final_price.currency,
      }
    : product.price_range.minimum_price.final_price

  return (
    <Box component='div' sx={sxx({}, sx)}>
      <Trans>
        As low as <ProductListPrice final_price={finalPrice} regular_price={finalPrice} />
      </Trans>
    </Box>
  )
}
