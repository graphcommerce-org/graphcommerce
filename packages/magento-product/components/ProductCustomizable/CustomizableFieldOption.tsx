import { Money } from '@graphcommerce/magento-store'
import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { SectionHeader } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Box } from '@mui/material'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import { OptionTypeRenderer } from './CustomizableAreaOption'

type CustomizableFieldOptionProps = React.ComponentProps<
  OptionTypeRenderer['CustomizableFieldOption']
>

export function CustomizableFieldOption(props: CustomizableFieldOptionProps) {
  const { uid, required, optionIndex, index, title, fieldValue, productPrice, currency } = props
  const { control, register, resetField, getValues } = useFormAddProductsToCart()

  if (!fieldValue) return null

  const maxLength = fieldValue.max_characters ?? 0
  return (
    <Box>
      <SectionHeader labelLeft={title} sx={{ mt: 0 }} />
      <input
        type='hidden'
        {...register(`cartItems.${index}.entered_options.${optionIndex}.uid`)}
        value={uid}
      />
      <TextFieldElement
        sx={{ width: '100%' }}
        color='primary'
        multiline
        control={control}
        name={`cartItems.${index}.entered_options.${optionIndex}.value`}
        required={Boolean(required)}
        InputProps={{
          endAdornment:
            fieldValue.price === 0
              ? null
              : fieldValue.price && (
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
                        fieldValue.price_type === 'PERCENT'
                          ? productPrice * (fieldValue.price / 100)
                          : fieldValue.price
                      }
                      currency={currency}
                    />
                  </Box>
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
        onChange={(data) => {
          if (!data.currentTarget.value)
            resetField(`cartItems.${index}.entered_options.${optionIndex}.value`)
        }}
      />
    </Box>
  )
}
