import type { FieldValues } from '@graphcommerce/react-hook-form'
import { useController } from '@graphcommerce/react-hook-form'
import { t } from '@lingui/core/macro'
import type { InputBaseProps } from '@mui/material'
import { InputBase, useForkRef } from '@mui/material'
import React from 'react'
import type { FieldElementProps } from './types'

export type InputBaseElementProps<TFieldValues extends FieldValues = FieldValues> =
  FieldElementProps<TFieldValues, InputBaseProps>

type InputBaseElementComponent = <TFieldValues extends FieldValues>(
  props: InputBaseElementProps<TFieldValues> & { ref?: React.Ref<HTMLInputElement> },
) => React.ReactNode

function InputBaseElementBase(
  props: InputBaseElementProps & { ref?: React.Ref<HTMLInputElement> },
): React.ReactElement {
  const {
    type,
    required,
    name,
    control,
    defaultValue,
    rules = {},
    shouldUnregister,
    ref,
    inputRef,
    disabled,
    ...rest
  } = props

  if (required && !rules.required) {
    rules.required = t`This field is required`
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
  })

  return (
    <InputBase
      {...rest}
      {...field}
      disabled={disabled}
      inputRef={useForkRef(field.ref, inputRef)}
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
