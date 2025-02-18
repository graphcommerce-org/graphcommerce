import { TextFieldElement, useWatch } from '@graphcommerce/ecommerce-ui'
import type { CurrencyEnum } from '@graphcommerce/graphql-mesh'
import { Money } from '@graphcommerce/magento-store'
import type { TypeRenderer } from '@graphcommerce/next-ui'
import { SectionHeader } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Box } from '@mui/material'
import React from 'react'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import { CustomizablePrice } from './CustomizablePrice'
import type { ProductCustomizableFragment } from './ProductCustomizable.gql'

export type OptionTypeRenderer = TypeRenderer<
  NonNullable<NonNullable<ProductCustomizableFragment['options']>[number]> & {
    index: number
    currency: CurrencyEnum
    productPrice: number
  }
>

export type CustomizableAreaOptionProps = React.ComponentProps<
  OptionTypeRenderer['CustomizableAreaOption']
>

export function CustomizableAreaOption(props: CustomizableAreaOptionProps) {
  const { uid, areaValue, required, index, title, currency, productPrice } = props
  const maxLength = areaValue?.max_characters ?? undefined
  const { control } = useFormAddProductsToCart()

  const name = `cartItems.${index}.customizable_options_entered.${uid}` as const
  if (!areaValue) return null

  return (
    <Box>
      <SectionHeader labelLeft={title} sx={{ mt: 0 }} />
      <TextFieldElement
        sx={{ width: '100%' }}
        color='primary'
        multiline
        minRows={3}
        control={control}
        name={name}
        InputProps={{
          endAdornment: (
            <CustomizablePrice
              name={name}
              price_type={areaValue.price_type}
              productPrice={productPrice}
              currency={currency}
              value={areaValue.price}
            />
          ),
        }}
        required={Boolean(required)}
        rules={{ maxLength }}
        helperText={
          (maxLength ?? 0) > 0 &&
          i18n._(/* i18n*/ 'There is a maximum of ‘{maxLength}’ characters', {
            maxLength,
          })
        }
      />
    </Box>
  )
}
