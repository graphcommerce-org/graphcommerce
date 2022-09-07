import {
  Control,
  Controller,
  ControllerProps,
  FieldError,
  Path,
  FieldValues,
} from '@graphcommerce/react-hook-form'
import { TextField, TextFieldProps } from '@mui/material'

export type TextFieldElementProps<T> = Omit<TextFieldProps, 'name'> & {
  validation?: ControllerProps['rules']
  name: Path<T>
  parseError?: (error: FieldError) => string
  control?: Control<T>
}

export function TextFieldElement<TFieldValues extends FieldValues>({
  validation = {},
  parseError,
  type,
  required,
  name,
  control,
  helperText,
  ...rest
}: TextFieldElementProps<TFieldValues>): JSX.Element {
  if (required && !validation.required) {
    validation.required = true // 'This field is required'
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
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <TextField
          {...rest}
          name={name}
          value={value ?? ''}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          type={type}
          error={Boolean(error)}
          helperText={error ? parseError?.(error) ?? error.message : helperText}
        />
      )}
    />
  )
}
