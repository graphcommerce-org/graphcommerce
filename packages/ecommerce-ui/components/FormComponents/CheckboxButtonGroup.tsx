import type { FieldValues, UseControllerProps } from '@graphcommerce/react-hook-form'
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

export type CheckboxButtonGroupProps<T extends FieldValues> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: { id: string | number; label: string }[] | any[]
  helperText?: string
  required?: boolean
  label?: string
  labelKey?: string
  valueKey?: string
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange?: Function
  returnObject?: boolean
  disabled?: boolean
  row?: boolean
  checkboxColor?: CheckboxProps['color']
} & UseControllerProps<T>

export function CheckboxButtonGroup<TFieldValues extends FieldValues>(
  props: CheckboxButtonGroupProps<TFieldValues>,
): JSX.Element {
  const {
    helperText,
    options,
    label,
    name,
    required,
    labelKey = 'label',
    valueKey = 'id',
    returnObject,
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
    field: { value = [], onChange },
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

  const handleChange = (index: number | string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newArray: (string | number)[] | any[] = [...value]
    const exists =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      value.findIndex((i: any) => (returnObject ? i[valueKey] === index : i === index)) === -1
    if (exists) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      newArray.push(returnObject ? options.find((i) => i[valueKey] === index) : index)
    } else {
      newArray.splice(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value.findIndex((i: any) => (returnObject ? i[valueKey] === index : i === index)),
        1,
      )
    }
    // setValue(name, newArray, { shouldValidate: true })
    onChange(newArray)
    if (typeof rest.onChange === 'function') {
      rest.onChange(newArray)
    }
  }

  return (
    <FormControl error={invalid} required={required}>
      {label && <FormLabel error={invalid}>{label}</FormLabel>}
      <FormGroup row={row}>
        {options.map((option: any) => {
          const optionKey = option[valueKey]
          if (!optionKey) {
            console.error(
              `CheckboxButtonGroup: valueKey ${valueKey} does not exist on option`,
              option,
            )
          }
          const isChecked =
            value.findIndex((item) =>
              returnObject ? item[valueKey] === optionKey : item === optionKey,
            ) !== -1
          return (
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: invalid ? theme.palette.error.main : undefined,
                  }}
                  color={checkboxColor || 'primary'}
                  value={optionKey}
                  checked={isChecked}
                  disabled={disabled}
                  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
