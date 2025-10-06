import { TextFieldElement, useWatch } from '@graphcommerce/ecommerce-ui'
import { Money } from '@graphcommerce/magento-store'
import { SectionHeader } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Box } from '@mui/material'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import type { OptionTypeRenderer } from './CustomizableAreaOption'
import { CustomizablePrice } from './CustomizablePrice'

export type CustomizableFieldOptionProps = React.ComponentProps<
  OptionTypeRenderer['CustomizableFieldOption']
>

export function CustomizableFieldOption(props: CustomizableFieldOptionProps) {
  const { uid, required, index, title: label, fieldValue, productPrice, currency } = props
  const { control } = useFormAddProductsToCart()

  const name = `cartItems.${index}.entered_options_record.${uid}` as const
  if (!fieldValue) return null

  const maxLength = fieldValue.max_characters ?? 0
  return (
    <Box>
      <SectionHeader
        labelLeft={
          <>
            {label} {required && ' *'}
          </>
        }
        sx={{ mt: 0 }}
      />
      <TextFieldElement
        sx={{ width: '100%' }}
        color='primary'
        multiline
        control={control}
        name={name}
        required={Boolean(required)}
        InputProps={{
          endAdornment: (
            <CustomizablePrice
              name={name}
              productPrice={productPrice}
              currency={currency}
              price_type={fieldValue.price_type}
              value={fieldValue.price}
            />
          ),
        }}
        rules={{
          maxLength: {
            value: maxLength,
            message: i18n._(/* i18n*/ 'There is a maximum of ‘{maxLength}’ characters', {
              maxLength,
            }),
          },
        }}
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
