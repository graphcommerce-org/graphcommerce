import {
  Controller,
  ControllerProps,
  FieldError,
  FieldValues,
} from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { TextField, TextFieldProps } from '@mui/material'

export type TextFieldElementProps<T extends FieldValues = FieldValues> = Omit<
  TextFieldProps,
  'name' | 'defaultValue'
> & {
  validation?: ControllerProps['rules']
  parseError?: (error: FieldError) => string
} & Omit<ControllerProps<T>, 'render'>

/** This is a copy of the default one, but allowing defaultValue */
export function TextFieldElement<TFieldValues extends FieldValues = FieldValues>({
  validation = {},
  parseError,
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
      message: 'Please enter a valid email address',
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      defaultValue={defaultValue}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => (
        <TextField
          {...rest}
          name={name}
          value={value ?? ''}
          onChange={(ev) => {
            onChange(ev)
            if (typeof rest.onChange === 'function') {
              rest?.onChange(ev)
            }
          }}
          onBlur={onBlur}
          required={required}
          type={type}
          error={invalid}
          helperText={
            error
              ? typeof parseError === 'function'
                ? parseError(error)
                : error.message
              : rest.helperText
          }
        />
      )}
    />
  )
}
