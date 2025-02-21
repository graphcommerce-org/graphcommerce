/* eslint-disable no-nested-ternary */
import { InputCheckmark } from '@graphcommerce/next-ui'
import type { FieldValues } from '@graphcommerce/react-hook-form'
import { emailPattern, useController } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import type { TextFieldProps } from '@mui/material'
import { TextField, useForkRef } from '@mui/material'
import React, { useState } from 'react'
import type { BaseControllerProps, FieldElementProps } from './types'

type ShowValidProps = { showValid?: boolean }

export type TextFieldElementProps<TFieldValues extends FieldValues = FieldValues> =
  FieldElementProps<TFieldValues, TextFieldProps> & ShowValidProps

type TextFieldElementComponent = <TFieldValues extends FieldValues>(
  props: TextFieldElementProps<TFieldValues>,
) => React.ReactNode

function toValue(incomingValue: unknown, type: React.HTMLInputTypeAttribute) {
  try {
    let value = incomingValue
    if (!value) return value

    if (typeof value === 'number') return value.toString()

    if (type === 'time' || type === 'datetime-local' || type === 'date') {
      if (typeof value === 'string') value = new Date(value)
      if (!(value instanceof Date)) return value

      const [datePart, timePart] = value.toISOString().replace('Z', '').split('T')

      if (type === 'time') return timePart
      if (type === 'date') return datePart
      if (type === 'datetime-local') return value.toISOString().replace('Z', '')
    }
    return value
  } catch (e) {
    console.error(e, incomingValue, type)
    return incomingValue
  }
}

/** @public */
function TextFieldElementBase(props: TextFieldElementProps): JSX.Element {
  const {
    name,
    control,
    defaultValue,
    rules = {},
    shouldUnregister,
    disabled: disabledField,
    type = 'text',
    required,
    showValid,
    asString = false,
    ...rest
  } = props as TextFieldProps & ShowValidProps & BaseControllerProps

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
    field: { onChange, ref, value = '', onBlur, disabled },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
    disabled: disabledField,
  })

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
      onBlur={onBlur}
      name={name}
      disabled={disabled}
      value={toValue(value, type)}
      inputProps={{ ...rest.inputProps, onAnimationStart }}
      onChange={(ev) => {
        let changeValue: string | number | Date = ev.target.value

        if (ev.target instanceof HTMLInputElement) {
          if (type === 'number' || typeof changeValue === 'number') {
            changeValue = ev.target.valueAsNumber
          } else if (type === 'datetime-local') {
            changeValue = new Date(`${changeValue.replace('T', ' ')}.000Z`)
          } else if (type === 'date') {
            changeValue = ev.target.valueAsDate ?? ''
          } else if (type === 'time') {
            changeValue = new Date(`01-01-1970 ${changeValue}.000Z`)
          }
        }

        if (asString) changeValue = changeValue.toString()

        onChange(changeValue)
        rest.onChange?.(ev)
      }}
      inputRef={useForkRef(ref, rest.inputRef)}
      required={required}
      type={type}
      error={Boolean(error) || rest.error}
      helperText={error ? error.message : rest.helperText}
      InputLabelProps={{ ...rest.InputLabelProps, shrink }}
      InputProps={{
        ...rest.InputProps,
        endAdornment:
          showValid && Boolean(value) && !error ? (
            <InputCheckmark show={!error} />
          ) : (
            rest.InputProps?.endAdornment
          ),
      }}
    />
  )
}

export const TextFieldElement = TextFieldElementBase as TextFieldElementComponent
