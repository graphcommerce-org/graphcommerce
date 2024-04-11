import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { SectionHeader } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { Box } from '@mui/material'
import { useFormAddProductsToCart } from '../AddProductsToCart'
import { OptionTypeRenderer } from './CustomizableAreaOption'

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
  } = props
  const { register, setValue, setError, getFieldState, clearErrors, control, resetField } =
    useFormAddProductsToCart()

  const { invalid } = getFieldState(`cartItems.${index}.entered_options.${optionIndex}.value`)

  minDate.setSeconds(0, 0)
  maxDate.setSeconds(0, 0)
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
        sx={{ width: '100%' }}
        required={!!required}
        error={invalid}
        helperText={invalid ? <Trans id='Invalid date' /> : ''}
        type='datetime-local'
        InputProps={{
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
