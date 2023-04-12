import {
  Controller,
  ControllerProps,
  FieldError,
  FieldValues,
} from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import {
  FormControl,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
  ToggleButtonProps,
} from '@mui/material'
import { ReactNode } from 'react'

type SingleToggleButtonProps = Omit<ToggleButtonProps, 'value' | 'children'> & {
  id: number | string
  label: ReactNode
}

export type ToggleButtonGroupElementProps<T extends FieldValues> = ToggleButtonGroupProps & {
  required?: boolean
  label?: string
  parseError?: (error: FieldError) => string
  options: SingleToggleButtonProps[]
  formLabelProps?: FormLabelProps
  helperText?: string
} & Omit<ControllerProps<T>, 'render'>

export function ToggleButtonGroupElement<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  label,
  rules = {},
  required,
  options = [],
  parseError,
  helperText,
  formLabelProps,
  ...toggleButtonGroupProps
}: ToggleButtonGroupElementProps<TFieldValues>) {
  if (required && !rules.required) {
    rules.required = i18n._(/* i18n */ 'This field is required')
  }

  const isRequired = required || !!rules?.required
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => {
        const renderHelperText = error
          ? typeof parseError === 'function'
            ? parseError(error)
            : error.message
          : helperText
        return (
          <FormControl error={invalid} required={isRequired}>
            {label && (
              <FormLabel
                {...formLabelProps}
                error={invalid}
                required={isRequired}
                sx={{ mb: 1, ...formLabelProps?.sx }}
              >
                {label}
              </FormLabel>
            )}
            <ToggleButtonGroup
              {...toggleButtonGroupProps}
              value={value}
              onBlur={onBlur}
              onChange={(event, val) => {
                onChange(val)
                if (typeof toggleButtonGroupProps.onChange === 'function') {
                  toggleButtonGroupProps.onChange(event, val)
                }
              }}
            >
              {options.map(({ label, id, ...toggleProps }) => (
                <ToggleButton value={id} {...toggleProps} key={id}>
                  {label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            {renderHelperText && <FormHelperText>{renderHelperText}</FormHelperText>}
          </FormControl>
        )
      }}
    />
  )
}
