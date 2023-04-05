import { Controller, ControllerProps, FieldValues } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { MenuItem, TextField, TextFieldProps } from '@mui/material'

export type SelectElementProps<T extends FieldValues> = Omit<
  TextFieldProps,
  'name' | 'type' | 'onChange' | 'defaultValue'
> & {
  validation?: ControllerProps<T>['rules']
  options?: { id: string | number; label: string | number }[] | any[]
  valueKey?: string
  labelKey?: string
  type?: 'string' | 'number'
  objectOnChange?: boolean
  onChange?: (value: any) => void
} & Omit<ControllerProps<T>, 'render'>

export function SelectElement<TFieldValues extends FieldValues>({
  name,
  required,
  valueKey = 'id',
  labelKey = 'label',
  options = [],
  type,
  objectOnChange,
  validation = {},
  control,
  defaultValue,
  ...rest
}: SelectElementProps<TFieldValues>): JSX.Element {
  const isNativeSelect = !!rest.SelectProps?.native
  const ChildComponent = isNativeSelect ? 'option' : MenuItem

  if (required && !validation.required) {
    validation.required = i18n._(/* i18n */ 'This field is required')
  }

  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onBlur, onChange, value }, fieldState: { invalid, error } }) => {
        // handle shrink on number input fields
        if (type === 'number' && typeof value !== 'undefined') {
          rest.InputLabelProps = rest.InputLabelProps || {}
          rest.InputLabelProps.shrink = true
        }

        return (
          <TextField
            {...rest}
            name={name}
            value={value ?? ''}
            onBlur={onBlur}
            onChange={(event) => {
              let item: number | string = event.target.value
              if (type === 'number') {
                item = Number(item)
              }
              onChange(item)
              if (typeof rest.onChange === 'function') {
                if (objectOnChange) {
                  item = options.find((i) => i[valueKey] === item)
                }
                rest.onChange(item)
              }
            }}
            select
            required={required}
            error={invalid}
            helperText={error ? error.message : rest.helperText}
          >
            {isNativeSelect && <option />}
            {options.map((item: any) => (
              <ChildComponent key={item[valueKey]} value={item[valueKey]}>
                {item[labelKey]}
              </ChildComponent>
            ))}
          </TextField>
        )
      }}
    />
  )
}
