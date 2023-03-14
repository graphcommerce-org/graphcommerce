import {
  FieldError,
  useController,
  FieldValues,
  UseControllerProps,
} from '@graphcommerce/react-hook-form'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { useTheme } from '@mui/material/styles'

import { ChangeEvent } from 'react'

export type RadioButtonGroupProps<T extends FieldValues> = {
  options: { label: string; id: string | number }[] | any[]
  helperText?: string
  required?: boolean
  parseError?: (error: FieldError) => string
  label?: string
  labelKey?: string
  valueKey?: string
  type?: 'number' | 'string'
  emptyOptionLabel?: 'string'
  onChange?: (value: any) => void
  returnObject?: boolean
  row?: boolean
} & UseControllerProps<T>

export function RadioButtonGroup<TFieldValues extends FieldValues>({
  helperText,
  options,
  label,
  name,
  parseError,
  labelKey = 'label',
  valueKey = 'id',
  required,
  emptyOptionLabel,
  returnObject,
  row,
  control,
  ...rest
}: RadioButtonGroupProps<TFieldValues>): JSX.Element {
  const theme = useTheme()
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    rules: required ? { required: 'This field is required' } : undefined,
    control,
  })

  helperText = error
    ? typeof parseError === 'function'
      ? parseError(error)
      : error.message
    : helperText

  const onRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const radioValue = (event.target as HTMLInputElement).value
    const returnValue = returnObject
      ? options.find((items) => items[valueKey] === radioValue)
      : radioValue
    // setValue(name, returnValue, { shouldValidate: true })
    onChange(returnValue)
    if (typeof rest.onChange === 'function') {
      rest.onChange(returnValue)
    }
  }

  return (
    <FormControl error={invalid}>
      {label && (
        <FormLabel required={required} error={invalid}>
          {label}
        </FormLabel>
      )}
      <RadioGroup onChange={onRadioChange} name={name} row={row} value={value || ''}>
        {emptyOptionLabel && (
          <FormControlLabel
            control={
              <Radio
                sx={{
                  color: invalid ? theme.palette.error.main : undefined,
                }}
                checked={!value}
              />
            }
            label={emptyOptionLabel}
            value=''
          />
        )}
        {options.map((option: any) => {
          const optionKey = option[valueKey]
          if (!optionKey) {
            console.error(
              `CheckboxButtonGroup: valueKey ${valueKey} does not exist on option`,
              option,
            )
          }
          const isChecked = !!(
            value && (returnObject ? value[valueKey] === optionKey : value === optionKey)
          )
          return (
            <FormControlLabel
              control={
                <Radio
                  sx={{
                    color: invalid ? theme.palette.error.main : undefined,
                  }}
                  checked={isChecked}
                />
              }
              value={optionKey}
              label={option[labelKey]}
              key={optionKey}
            />
          )
        })}
      </RadioGroup>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
