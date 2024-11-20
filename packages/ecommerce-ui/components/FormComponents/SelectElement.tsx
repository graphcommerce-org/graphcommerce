import { InputCheckmark } from '@graphcommerce/next-ui'
import type { ControllerProps, FieldValues } from '@graphcommerce/react-hook-form'
import { useController } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import type { TextFieldProps } from '@mui/material'
import { MenuItem, TextField } from '@mui/material'

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
  showValid?: boolean
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
  showValid,
  disabled,
  shouldUnregister,
  ...rest
}: SelectElementProps<TFieldValues, O>): JSX.Element {
  const isNativeSelect = !!rest.SelectProps?.native
  const ChildComponent = isNativeSelect ? 'option' : MenuItem

  if (required && !rules.required) {
    rules.required = i18n._(/* i18n */ 'This field is required')
  }

  const {
    field: { onChange, value, ref, ...field },
    fieldState: { invalid, error },
  } = useController({
    name,
    rules,
    control,
    defaultValue,
    disabled,
    shouldUnregister,
  })

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
      InputProps={{
        ...rest.InputProps,
        endAdornment:
          showValid && value && !error ? (
            <InputCheckmark show={!error} />
          ) : (
            rest.InputProps?.endAdornment
          ),
      }}
    >
      {isNativeSelect && <option />}
      {options.map((item) => (
        <ChildComponent key={item.id} value={item.id}>
          {item.label}
        </ChildComponent>
      ))}
    </TextField>
  )
}
