import type { Control, FieldName, FieldPath } from '@graphcommerce/ecommerce-ui'
import { useWatch, type FieldValues } from '@graphcommerce/ecommerce-ui'
import type { PriceTypeEnum } from '@graphcommerce/graphql-mesh'
import { Money, type MoneyFragment } from '@graphcommerce/magento-store'
import { Box } from '@mui/material'
import { useFormAddProductsToCart, type AddProductsToCartFields } from '../AddProductsToCart'

type CustomizablePriceProps = {
  price_type: PriceTypeEnum | null | undefined
  productPrice: number
  name: FieldPath<AddProductsToCartFields>
} & MoneyFragment

export function CustomizablePrice(props: CustomizablePriceProps) {
  const { name, value, currency, price_type, productPrice } = props

  const { control } = useFormAddProductsToCart()
  const optionValue = !!useWatch({ control, name })

  if (!value) return null

  return (
    <Box
      sx={[
        {
          display: 'flex',
          typography: 'body1',
          '&.sizeMedium': { typographty: 'subtitle1' },
          '&.sizeLarge': { typography: 'h6' },
        },
        optionValue
          ? {
              color: 'text.primary',
            }
          : {
              color: 'text.secondary',
            },
      ]}
    >
      {/* Change fontFamily so the + is properly outlined */}
      <span style={{ fontFamily: 'arial' }}>+{'\u00A0'}</span>
      <Money
        value={price_type === 'PERCENT' ? productPrice * (value / 100) : value}
        currency={currency}
      />
    </Box>
  )
}
