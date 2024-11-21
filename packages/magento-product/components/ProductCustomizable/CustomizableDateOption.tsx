import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { Money } from '@graphcommerce/magento-store'
import { SectionHeader } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box } from '@mui/material'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import type { OptionTypeRenderer } from './CustomizableAreaOption'

type CustomizableDateOptionProps = React.ComponentProps<
  OptionTypeRenderer['CustomizableDateOption']
> & {
  minDate?: Date
  maxDate?: Date
}

export function CustomizableDateOption(props: CustomizableDateOptionProps) {
  const {
    uid,
    required,
    optionIndex,
    index,
    title,
    minDate = new Date('1950-11-12T00:00'),
    maxDate = new Date('9999-11-12T00:00'),
    dateValue,
    currency,
    productPrice,
  } = props
  const {
    register,
    setValue,
    setError,
    getFieldState,
    clearErrors,
    control,
    resetField,
    getValues,
  } = useFormAddProductsToCart()

  const { invalid } = getFieldState(`cartItems.${index}.entered_options.${optionIndex}.value`)

  minDate.setSeconds(0, 0)
  maxDate.setSeconds(0, 0)
  if (!dateValue) return null

  const price =
    dateValue.price === 0
      ? null
      : dateValue.price && (
          <Box
            sx={{
              display: 'flex',
              typography: 'body1',
              '&.sizeMedium': { typographty: 'subtitle1' },
              '&.sizeLarge': { typography: 'h6' },
              color:
                dateValue.uid ===
                getValues(`cartItems.${index}.entered_options.${optionIndex}.value`)
                  ? 'text.primary'
                  : 'text.secondary',
            }}
          >
            {/* Change fontFamily so the + is properly outlined */}
            <span style={{ fontFamily: 'arial' }}>+{'\u00A0'}</span>
            <Money
              value={
                dateValue.price_type === 'PERCENT'
                  ? productPrice * (dateValue.price / 100)
                  : dateValue.price
              }
              currency={currency}
            />
          </Box>
        )
  return (
    <Box>
      <input
        type='hidden'
        {...register(`cartItems.${index}.entered_options.${optionIndex}.uid`)}
        value={uid}
      />

      <SectionHeader labelLeft={title} sx={{ mt: 0 }} />
      <TextFieldElement
        control={control}
        name={`cartItems.${index}.entered_options.${optionIndex}.value`}
        sx={{
          width: '100%',
          '& input[type="datetime-local"]::-webkit-calendar-picker-indicator': {
            filter: (theme) => (theme.palette.mode === 'dark' ? 'invert(100%)' : 'none'),
            mr: '10px',
          },
        }}
        defaultValue=''
        required={!!required}
        error={invalid}
        helperText={invalid ? <Trans id='Invalid date' /> : ''}
        type='datetime-local'
        InputProps={{
          endAdornment: price,
          inputProps: {
            min: minDate.toISOString().replace(/:00.000Z/, ''),
            max: maxDate.toISOString().replace(/:00.000Z/, ''),
          },
        }}
        onChange={(data) => {
          const selectedDate = new Date(data.currentTarget.value)
          if (selectedDate < minDate || selectedDate > maxDate) {
            setError(`cartItems.${index}.entered_options.${optionIndex}.value`, {
              message: 'Invalid date',
            })
          } else {
            clearErrors(`cartItems.${index}.entered_options.${optionIndex}.value`)
          }
          if (data.currentTarget.value)
            setValue(
              `cartItems.${index}.entered_options.${optionIndex}.value`,
              `${data.currentTarget.value.replace('T', ' ')}:00`,
            )
          else resetField(`cartItems.${index}.entered_options.${optionIndex}.value`)
        }}
      />
    </Box>
  )
}
