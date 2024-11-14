/* eslint-disable no-nested-ternary */
import { InputCheckmark } from '@graphcommerce/next-ui'
import {
  FieldValues,
  UseControllerProps,
  emailPattern,
  useController,
} from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { TextField, TextFieldProps } from '@mui/material'
import React, { useState } from 'react'

export type TextFieldElementProps<T extends FieldValues = FieldValues> = Omit<
  TextFieldProps,
  'name' | 'defaultValue'
> & {
  /** @deprecated Please use the rules props instead */
  validation?: UseControllerProps<T>['rules']

  showValid?: boolean
} & UseControllerProps<T>

export function TextFieldElement<TFieldValues extends FieldValues>({
  validation = {},
  type,
  required,
  name,
  control,
  defaultValue,
  rules = validation,
  shouldUnregister,
  showValid,
  disabled,
  ...rest
}: TextFieldElementProps<TFieldValues>): JSX.Element {
  if (required && !rules.required) {
    rules.required = i18n._(/* i18n */ 'This field is required')
  }

  if (type === 'email' && !rules.pattern) {
    rules.pattern = {
      value: emailPattern,
      message: i18n._(/* i18n */ 'Please enter a valid email address'),
    }
  }

  const {
    field: { onChange, ref, value = '', ...field },
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue, shouldUnregister, disabled })

  // https://stackoverflow.com/questions/76830737/chrome-autofill-causes-textbox-collision-for-textfield-label-and-value
  const [hasAutofill, setHasAutofill] = useState(false)
  const shrink = hasAutofill || rest.InputLabelProps?.shrink || Boolean(value)
  const onAnimationStart = (e: React.AnimationEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target instanceof HTMLElement) {
      const autofilled = !!e.target.matches('*:-webkit-autofill')
      if (e.animationName === 'mui-auto-fill') setHasAutofill(autofilled)
      if (e.animationName === 'mui-auto-fill-cancel') setHasAutofill(autofilled)
    }
    return rest.inputProps?.onAnimationStart?.(e)
  }

  return (
    <TextField
      {...rest}
      {...field}
      value={value}
      inputProps={{ ...rest.inputProps, onAnimationStart }}
      onChange={(ev) => {
        onChange(type === 'number' && ev.target.value ? Number(ev.target.value) : ev.target.value)
        rest.onChange?.(ev)
      }}
      inputRef={ref}
      required={required}
      type={type}
      error={Boolean(error) || rest.error}
      helperText={error ? error.message : rest.helperText}
      InputLabelProps={{ ...rest.InputLabelProps, shrink }}
      InputProps={{
        ...rest.InputProps,
        endAdornment:
          showValid && value && !error ? (
            <InputCheckmark show={!error} />
          ) : (
            rest.InputProps?.endAdornment
          ),
      }}
    />
  )
}
