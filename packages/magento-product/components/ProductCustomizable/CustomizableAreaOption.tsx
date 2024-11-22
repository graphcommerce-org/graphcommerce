import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import type { CurrencyEnum } from '@graphcommerce/graphql-mesh'
import { Money } from '@graphcommerce/magento-store'
import type { TypeRenderer } from '@graphcommerce/next-ui'
import { SectionHeader } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Box } from '@mui/material'
import React from 'react'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import type { ProductCustomizableFragment } from './ProductCustomizable.gql'

export type OptionTypeRenderer = TypeRenderer<
  NonNullable<NonNullable<ProductCustomizableFragment['options']>[number]> & {
    optionIndex: number
    index: number
    currency: CurrencyEnum
    productPrice: number
  }
>

type CustomizableAreaOptionProps = React.ComponentProps<
  OptionTypeRenderer['CustomizableAreaOption']
>

export function CustomizableAreaOption(props: CustomizableAreaOptionProps) {
  const { uid, areaValue, required, optionIndex, index, title, currency, productPrice } = props
  const maxLength = areaValue?.max_characters ?? undefined
  const { control, register, getValues } = useFormAddProductsToCart()

  if (!areaValue) return null

  return (
    <Box>
      <input
        type='hidden'
        {...register(`cartItems.${index}.entered_options.${optionIndex}.uid`)}
        value={uid}
      />
      <SectionHeader labelLeft={title} sx={{ mt: 0 }} />
      <TextFieldElement
        sx={{ width: '100%' }}
        color='primary'
        multiline
        minRows={3}
        control={control}
        name={`cartItems.${index}.entered_options.${optionIndex}.value`}
        InputProps={{
          endAdornment:
            areaValue.price === 0
              ? null
              : areaValue.price && (
                  <Box
                    sx={{
                      display: 'flex',
                      typography: 'body1',
                      '&.sizeMedium': { typographty: 'subtitle1' },
                      '&.sizeLarge': { typography: 'h6' },
                      color: getValues(`cartItems.${index}.entered_options.${optionIndex}.value`)
                        ? 'text.primary'
                        : 'text.secondary',
                    }}
                  >
                    {/* Change fontFamily so the + is properly outlined */}
                    <span style={{ fontFamily: 'arial', paddingTop: '1px' }}>+{'\u00A0'}</span>
                    <Money
                      value={
                        areaValue.price_type === 'PERCENT'
                          ? productPrice * (areaValue.price / 100)
                          : areaValue.price
                      }
                      currency={currency}
                    />
                  </Box>
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
