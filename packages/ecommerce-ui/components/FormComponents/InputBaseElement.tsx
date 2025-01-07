import type { FieldValues } from '@graphcommerce/react-hook-form'
import { useController } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import type { InputBaseProps } from '@mui/material'
import { InputBase } from '@mui/material'
import React from 'react'
import type { FieldElementProps } from './types'

export type InputBaseElementProps<TFieldValues extends FieldValues = FieldValues> =
  FieldElementProps<TFieldValues, InputBaseProps>

type InputBaseElementComponent = <TFieldValues extends FieldValues>(
  props: InputBaseElementProps<TFieldValues> & { ref?: React.Ref<HTMLInputElement> },
) => React.ReactNode

function InputBaseElementBase(
  props: InputBaseElementProps & { ref?: React.Ref<HTMLInputElement> },
): JSX.Element {
  const {
    type,
    required,
    name,
    control,
    defaultValue,
    rules = {},
    shouldUnregister,
    disabled,
    ref,
    ...rest
  } = props

  if (required && !rules.required) {
    rules.required = i18n._(/* i18n */ 'This field is required')
  }

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
    disabled,
  })

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
}

/** @public */
export const InputBaseElement = React.forwardRef<HTMLInputElement, InputBaseElementProps>(
  (props, ref) => InputBaseElementBase({ ...props, ref }),
) as InputBaseElementComponent
