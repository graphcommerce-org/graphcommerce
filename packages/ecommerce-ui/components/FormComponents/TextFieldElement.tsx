/* eslint-disable no-nested-ternary */
import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps,
} from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { TextField, TextFieldProps } from '@mui/material'

export type TextFieldElementProps<T extends FieldValues = FieldValues> = Omit<
  TextFieldProps,
  'name' | 'defaultValue'
> & {
  validation?: UseControllerProps<T>['rules']
} & Omit<UseControllerProps<T>, 'rules'>

export function TextFieldElement<TFieldValues extends FieldValues>({
  validation = {},
  type,
  required,
  name,
  control,
  defaultValue,
  ...rest
}: TextFieldElementProps<TFieldValues>): JSX.Element {
  if (required && !validation.required) {
    validation.required = i18n._(/* i18n */ 'This field is required')
  }

  if (type === 'email' && !validation.pattern) {
    validation.pattern = {
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
      rules={validation}
      defaultValue={defaultValue}
      render={({ field: { value, onChange, onBlur, ref }, fieldState: { error } }) => (
        <TextField
          {...rest}
          name={name}
          value={value ?? ''}
          onChange={(ev) => {
            onChange(
              type === 'number' && ev.target.value ? Number(ev.target.value) : ev.target.value,
            )
            rest.onChange?.(ev)
          }}
          onBlur={onBlur}
          required={required}
          type={type}
          error={Boolean(error) || rest.error}
          helperText={error ? error.message : rest.helperText}
          inputRef={ref}
        />
      )}
    />
  )
}
