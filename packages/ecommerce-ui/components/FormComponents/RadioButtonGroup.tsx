import type { FieldValues } from '@graphcommerce/react-hook-form'
import { useController } from '@graphcommerce/react-hook-form'
import { t } from '@lingui/core/macro'
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
import type { BaseControllerProps } from './types'

type OptionBase = { id: string | number; label: string | number }

type AdditionalProps<TOption extends OptionBase = OptionBase> = {
  options: TOption[]
  helperText?: string
  required?: boolean
  label?: string
  labelKey?: keyof TOption
  valueKey?: keyof TOption
  onChange?: (value: string | number) => void
  disabled?: boolean
  row?: boolean
  emptyOptionLabel?: string
}

export type RadioButtonGroupProps<
  TFieldValues extends FieldValues = FieldValues,
  TOption extends OptionBase = OptionBase,
> = BaseControllerProps<TFieldValues> & AdditionalProps<TOption>

type RadioButtonGroupComponent = <TFieldValues extends FieldValues>(
  props: RadioButtonGroupProps<TFieldValues>,
) => React.ReactNode

function RadioButtonGroupBase(props: RadioButtonGroupProps): JSX.Element {
  const {
    helperText,
    options,
    label,
    name,
    labelKey = 'label',
    valueKey = 'id',
    required,
    emptyOptionLabel,
    row,
    control,
    defaultValue,
    disabled,
    shouldUnregister,
    ...rest
  } = props

  const theme = useTheme()
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    rules: required ? { required: t`This field is required` } : undefined,
    control,
    defaultValue,
    shouldUnregister,
  })

  const parsedHelperText = error ? error.message : helperText

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const radioValue = event.target.value
    onChange(radioValue)
    rest.onChange?.(radioValue)
  }

  return (
    <FormControl error={invalid} required={required}>
      {label && <FormLabel error={invalid}>{label}</FormLabel>}
      <RadioGroup
        onChange={handleChange}
        onBlur={onBlur}
        ref={ref}
        name={name}
        row={row}
        value={value ?? ''}
      >
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
          return (
            <FormControlLabel
              control={
                <Radio
                  disabled={disabled}
                  sx={{
                    color: invalid ? theme.palette.error.main : undefined,
                  }}
                  checked={value === optionKey}
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

/** @public */
export const RadioButtonGroup = RadioButtonGroupBase as RadioButtonGroupComponent
