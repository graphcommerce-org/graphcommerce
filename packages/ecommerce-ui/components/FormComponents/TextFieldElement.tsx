/* eslint-disable no-nested-ternary */
import { Controller, FieldValues, UseControllerProps } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { TextField, TextFieldProps } from '@mui/material'

export type TextFieldElementProps<T extends FieldValues = FieldValues> = Omit<
  TextFieldProps,
  'name' | 'defaultValue'
> & {
  /** @deprecated Please use the rules props instead */
  validation?: UseControllerProps<T>['rules']
} & UseControllerProps<T>

export function TextFieldElement<TFieldValues extends FieldValues>({
  validation = {},
  type,
  required,
  name,
  control,
  defaultValue,
  rules = validation,
  ...rest
}: TextFieldElementProps<TFieldValues>): JSX.Element {
  if (required && !rules.required) {
    rules.required = i18n._(/* i18n */ 'This field is required')
  }

  if (type === 'email' && !rules.pattern) {
    rules.pattern = {
      // eslint-disable-next-line no-useless-escape
      value:
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: i18n._(/* i18n */ 'Please enter a valid email address'),
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange, ref, ...field }, fieldState: { error } }) => (
        <TextField
          {...rest}
          {...field}
          onChange={(ev) => {
            onChange(
              type === 'number' && ev.target.value ? Number(ev.target.value) : ev.target.value,
            )
            rest.onChange?.(ev)
          }}
          inputRef={ref}
          required={required}
          type={type}
          error={Boolean(error) || rest.error}
          helperText={error ? error.message : rest.helperText}
        />
      )}
    />
  )
}
