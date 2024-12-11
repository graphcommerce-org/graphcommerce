import type { FieldValues, UseControllerProps } from '@graphcommerce/react-hook-form'
import { useController } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  useTheme,
} from '@mui/material'
import type { ChangeEvent } from 'react'

export type RadioButtonGroupProps<T extends FieldValues> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: { label: string; id: string | number }[] | any[]
  helperText?: string
  required?: boolean
  label?: string
  labelKey?: string
  valueKey?: string
  type?: 'number' | 'string'
  emptyOptionLabel?: 'string'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (value: any) => void
  returnObject?: boolean
  row?: boolean
} & UseControllerProps<T>

export function RadioButtonGroup<TFieldValues extends FieldValues>(
  props: RadioButtonGroupProps<TFieldValues>,
): JSX.Element {
  const {
    helperText,
    options,
    label,
    name,
    labelKey = 'label',
    valueKey = 'id',
    required,
    emptyOptionLabel,
    returnObject,
    row,
    control,
    defaultValue,
    disabled,
    shouldUnregister,
    ...rest
  } = props

  const theme = useTheme()
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    rules: required ? { required: i18n._(/* i18n */ 'This field is required') } : undefined,
    control,
    defaultValue,
    disabled,
    shouldUnregister,
  })

  const parsedHelperText = error ? error.message : helperText

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
        {options.map((option) => {
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
      {parsedHelperText && <FormHelperText>{parsedHelperText}</FormHelperText>}
    </FormControl>
  )
}
