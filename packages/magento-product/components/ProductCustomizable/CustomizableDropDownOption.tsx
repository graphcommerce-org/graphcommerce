import { SelectElement, useController } from '@graphcommerce/ecommerce-ui'
import { SectionHeader, filterNonNullableKeys } from '@graphcommerce/next-ui'
import { Box, ListItemText, MenuItem, TextField, Typography } from '@mui/material'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import { OptionTypeRenderer } from './CustomizableAreaOption'
import { Money } from '@graphcommerce/magento-store'

type CustomizableDropDownOptionProps = React.ComponentProps<
  OptionTypeRenderer['CustomizableDropDownOption']
>

export function CustomizableDropDownOption(props: CustomizableDropDownOptionProps) {
  const { uid, required, index, title, dropdownValue, productPrice, currency } = props
  const { control, getValues } = useFormAddProductsToCart()

  const {
    field: { onChange, value, ref, ...field },
    fieldState: { invalid, error },
  } = useController({
    name: `cartItems.${index}.customizable_options.${uid}`,
    rules: {
      required: Boolean(required),
    },
    control,
    defaultValue: '',
  })

  return (
    <Box>
      <SectionHeader labelLeft={title} sx={{ mt: 0 }} />

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
        required={Boolean(required)}
        error={invalid}
        helperText={error?.message}
      >
        {filterNonNullableKeys(dropdownValue, ['title']).map((option) => (
          <MenuItem key={option.uid} value={option.uid}>
            <Box>{option.title}</Box>

            {option.price ? (
              <Box
                sx={{
                  // display: 'flex',
                  typography: 'body1',
                  '&.sizeMedium': { typographty: 'subtitle1' },
                  '&.sizeLarge': { typography: 'h6' },
                  color: option.uid === value ? 'text.primary' : 'text.secondary',
                }}
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
