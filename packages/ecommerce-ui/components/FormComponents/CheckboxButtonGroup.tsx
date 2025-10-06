import type { FieldValues } from '@graphcommerce/react-hook-form'
import { useController } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import type { CheckboxProps } from '@mui/material'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  useTheme,
} from '@mui/material'
import type { BaseControllerProps } from './types'

type OptionBase = { id: string | number; label: string | number }

type AdditionalProps<TOption extends OptionBase = OptionBase> = {
  options: TOption[]
  helperText?: string
  required?: boolean
  label?: string
  labelKey?: keyof TOption
  valueKey?: keyof TOption
  onChange?: (value: (string | number)[]) => void
  disabled?: boolean
  row?: boolean
  checkboxColor?: CheckboxProps['color']
}

export type CheckboxButtonGroupProps<
  TFieldValues extends FieldValues = FieldValues,
  TOption extends OptionBase = OptionBase,
> = BaseControllerProps<TFieldValues> & AdditionalProps<TOption>

type CheckboxButtonGroupComponent = <TFieldValues extends FieldValues>(
  props: CheckboxButtonGroupProps<TFieldValues>,
) => React.ReactNode

function CheckboxButtonGroupBase(props: CheckboxButtonGroupProps) {
  const {
    helperText,
    options,
    label,
    name,
    required,
    labelKey = 'label',
    valueKey = 'id',
    disabled,
    row,
    control,
    checkboxColor,
    defaultValue,
    shouldUnregister,
    ...rest
  } = props

  const theme = useTheme()
  const {
    field: { value = [], onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    rules: required ? { required: i18n._(/* i18n */ 'This field is required') } : undefined,
    control,
    defaultValue,
    shouldUnregister,
  })

  const parsedHelperText = error ? error.message : helperText

  const handleChange = (optionKey: string | number) => {
    const currentValue = value as (string | number)[]
    const newArray = [...currentValue]

    const index = currentValue.indexOf(optionKey)
    if (index === -1) {
      newArray.push(optionKey)
    } else {
      newArray.splice(index, 1)
    }

    onChange(newArray)
    rest.onChange?.(newArray)
  }

  return (
    <FormControl error={invalid} required={required}>
      {label && <FormLabel error={invalid}>{label}</FormLabel>}
      <FormGroup row={row} ref={ref} onBlur={onBlur}>
        {options.map((option) => {
          const optionKey = option[valueKey]
          const isChecked = (value as (string | number)[]).includes(optionKey)
          return (
            <FormControlLabel
              control={
                <Checkbox
                  sx={{ color: invalid ? theme.palette.error.main : undefined }}
                  color={checkboxColor || 'primary'}
                  value={optionKey}
                  checked={isChecked}
                  disabled={disabled}
                  onChange={() => handleChange(optionKey)}
                />
              }
              label={option[labelKey]}
              key={optionKey}
            />
          )
        })}
      </FormGroup>
      {parsedHelperText && <FormHelperText>{parsedHelperText}</FormHelperText>}
    </FormControl>
  )
}

/** @public */
export const CheckboxButtonGroup = CheckboxButtonGroupBase as CheckboxButtonGroupComponent
