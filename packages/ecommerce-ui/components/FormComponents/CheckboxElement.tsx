import {
  Controller,
  ControllerProps,
  FieldError,
  FieldValues,
} from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormGroup,
  FormHelperText,
  SxProps,
  Theme,
} from '@mui/material'
import { useRef } from 'react'

export type CheckboxElementProps<T extends FieldValues> = Omit<CheckboxProps, 'name'> & {
  parseError?: (error: FieldError) => string
  label?: FormControlLabelProps['label']
  helperText?: string
  sx?: SxProps<Theme>
  formControl?: Omit<FormControlProps<'div'>, 'required' | 'error'>
} & Omit<ControllerProps<T>, 'render'>

export function CheckboxElement<TFieldValues extends FieldValues>({
  name,
  rules = {},
  required,
  parseError,
  label,
  control,
  helperText,
  sx,
  formControl,
  ...rest
}: CheckboxElementProps<TFieldValues>): JSX.Element {
  if (required && !rules.required) {
    rules.required = i18n._(/* i18n */ 'This field is required')
  }

  const checkboxRef = useRef<HTMLInputElement>(null)

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { value, onChange }, fieldState: { invalid, error } }) => {
        if (invalid) checkboxRef.current?.focus()
        const parsedHelperText = error
          ? typeof parseError === 'function'
            ? parseError(error)
            : error.message
          : helperText
        return (
          <FormControl required={required} error={invalid} {...formControl}>
            <FormGroup row>
              <FormControlLabel
                label={label || ''}
                control={
                  <Checkbox
                    {...rest}
                    inputRef={checkboxRef}
                    color={rest.color || 'primary'}
                    sx={{
                      ...(Array.isArray(sx) ? sx : [sx]),
                      color: invalid ? 'error.main' : undefined,
                    }}
                    value={value}
                    checked={!!value}
                    onChange={() => {
                      onChange(!value)
                    }}
                  />
                }
              />
            </FormGroup>
            {parsedHelperText && (
              <FormHelperText error={invalid}>{parsedHelperText}</FormHelperText>
            )}
          </FormControl>
        )
      }}
    />
  )
}
