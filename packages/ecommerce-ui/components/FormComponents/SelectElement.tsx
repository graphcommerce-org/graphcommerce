import { Controller, ControllerProps, FieldValues } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { MenuItem, TextField, TextFieldProps } from '@mui/material'

type OptionBase = { id: string | number; label: string | number }

export type SelectElementProps<T extends FieldValues, O extends OptionBase> = Omit<
  TextFieldProps,
  'name' | 'type' | 'onChange' | 'defaultValue'
> & {
  /** @deprecated Please use the rules props instead */
  validation?: ControllerProps<T>['rules']
  options?: O[]
  type?: 'string' | 'number'
  onChange?: (value: string | number) => void
} & Omit<ControllerProps<T>, 'render'>

export function SelectElement<TFieldValues extends FieldValues, O extends OptionBase>({
  name,
  required,
  options = [],
  type,
  validation,
  control,
  defaultValue,
  rules = validation ?? {},
  ...rest
}: SelectElementProps<TFieldValues, O>): JSX.Element {
  const isNativeSelect = !!rest.SelectProps?.native
  const ChildComponent = isNativeSelect ? 'option' : MenuItem

  if (required && !rules.required) {
    rules.required = i18n._(/* i18n */ 'This field is required')
  }

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value, ref, ...field }, fieldState: { invalid, error } }) => {
        // handle shrink on number input fields
        if (type === 'number' && typeof value !== 'undefined') {
          rest.InputLabelProps = rest.InputLabelProps || {}
          rest.InputLabelProps.shrink = true
        }

        return (
          <TextField
            {...rest}
            value={value ?? ''}
            {...field}
            inputRef={ref}
            onChange={(event) => {
              let item: number | string | O | undefined = event.target.value
              if (type === 'number') item = Number(item)
              rest.onChange?.(item)
              onChange(item)
            }}
            select
            required={required}
            error={invalid}
            helperText={error ? error.message : rest.helperText}
          >
            {isNativeSelect && <option />}
            {options.map((item) => (
              <ChildComponent key={item.id} value={item.id}>
                {item.label}
              </ChildComponent>
            ))}
          </TextField>
        )
      }}
    />
  )
}
