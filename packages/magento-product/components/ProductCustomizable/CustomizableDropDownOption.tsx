import { useController } from '@graphcommerce/ecommerce-ui'
import { Money } from '@graphcommerce/magento-store'
import { filterNonNullableKeys, SectionHeader, sxx } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Box, MenuItem, TextField } from '@mui/material'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import type { OptionTypeRenderer } from './CustomizableAreaOption'

export type CustomizableDropDownOptionProps = React.ComponentProps<
  OptionTypeRenderer['CustomizableDropDownOption']
>

export function CustomizableDropDownOption(props: CustomizableDropDownOptionProps) {
  const { uid, required, index, title, dropdownValue, productPrice, currency } = props
  const { control } = useFormAddProductsToCart()

  const label = title ?? ''
  const {
    field: { onChange, value, ref, ...field },
    fieldState: { invalid, error },
  } = useController({
    name: `cartItems.${index}.selected_options_record.${uid}`,
    rules: {
      required: required ? t`Please select a value for ‘${label}’` : false,
    },
    control,
    defaultValue: '',
  })

  return (
    <Box>
      <SectionHeader
        labelLeft={
          <>
            {title} {required && ' *'}
          </>
        }
        sx={{ mt: 0 }}
      />
      <TextField
        sx={{
          width: '100%',
          '& .MuiSelect-select': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        }}
        color='primary'
        value={value ?? ''}
        {...field}
        inputRef={ref}
        onChange={(event) => onChange(event.target.value)}
        select
        error={invalid}
        helperText={error?.message}
      >
        {filterNonNullableKeys(dropdownValue, ['title']).map((option) => (
          <MenuItem key={option.uid} value={option.uid}>
            <Box>{option.title}</Box>

            {option.price ? (
              <Box
                sx={sxx(
                  {
                    // display: 'flex',
                    typography: 'body1',
                    '&.sizeMedium': { typographty: 'subtitle1' },
                    '&.sizeLarge': { typography: 'h6' },
                  },
                  option.uid === value
                    ? {
                        color: 'text.primary',
                      }
                    : {
                        color: 'text.secondary',
                      },
                )}
              >
                <span style={{ fontFamily: 'arial', paddingTop: '1px' }}>+&nbsp;</span>
                <Money
                  value={
                    option.price_type === 'PERCENT'
                      ? productPrice * (option.price / 100)
                      : option.price
                  }
                  currency={currency}
                />
              </Box>
            ) : null}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  )
}
