import type { ControllerProps, FieldValues } from '@graphcommerce/react-hook-form'
import { useController } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import type { FormLabelProps, ToggleButtonGroupProps, ToggleButtonProps } from '@mui/material'
import {
  FormControl,
  FormHelperText,
  FormLabel,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import type { ReactNode } from 'react'

type SingleToggleButtonProps = Omit<ToggleButtonProps, 'value' | 'children'> & {
  id: number | string
  label: ReactNode
}

export type ToggleButtonGroupElementProps<T extends FieldValues> = ToggleButtonGroupProps & {
  required?: boolean
  label?: string
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
  helperText,
  formLabelProps,
  defaultValue,
  disabled,
  shouldUnregister,
  ...toggleButtonGroupProps
}: ToggleButtonGroupElementProps<TFieldValues>) {
  if (required && !rules.required) {
    rules.required = i18n._(/* i18n */ 'This field is required')
  }

  const isRequired = required || !!rules?.required

  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
    disabled,
    shouldUnregister,
  })

  const renderHelperText = error ? error.message : helperText

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
        {options.map(({ label: labelVal, id, ...toggleProps }) => (
          <ToggleButton value={id} {...toggleProps} key={id}>
            {labelVal}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {renderHelperText && <FormHelperText>{renderHelperText}</FormHelperText>}
    </FormControl>
  )
}
