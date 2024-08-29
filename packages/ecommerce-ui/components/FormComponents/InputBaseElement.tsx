/* eslint-disable no-nested-ternary */
import { FieldValues, UseControllerProps, useController } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { InputBase, InputBaseProps } from '@mui/material'
import React from 'react'

export type InputBaseElementProps<T extends FieldValues = FieldValues> = Omit<
  InputBaseProps,
  'name' | 'defaultValue'
> & {
  showValid?: boolean
} & UseControllerProps<T>

type InputBaseElementComponent = <TFieldValues extends FieldValues>(
  props: InputBaseElementProps<TFieldValues> & { ref?: React.Ref<HTMLInputElement> },
) => JSX.Element

export const InputBaseElement = React.forwardRef<
  HTMLInputElement,
  InputBaseElementProps<FieldValues>
>((props: InputBaseElementProps<FieldValues>, ref: React.Ref<HTMLInputElement>): JSX.Element => {
  const {
    type,
    required,
    name,
    control,
    defaultValue,
    rules = {},
    shouldUnregister,
    showValid,
    disabled,
    ...rest
  } = props

  if (required && !rules?.required) {
    rules.required = i18n._(/* i18n */ 'This field is required')
  }

  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue, shouldUnregister, disabled })

  return (
    <InputBase
      {...rest}
      {...field}
      ref={ref}
      required={required}
      type={type}
      error={Boolean(error) || rest.error}
    />
  )
}) as InputBaseElementComponent
