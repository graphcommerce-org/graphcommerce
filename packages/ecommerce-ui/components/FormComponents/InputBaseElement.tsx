/* eslint-disable no-nested-ternary */
import { FieldValues, UseControllerProps, useController } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { InputBase, InputBaseProps } from '@mui/material'

export type InputBaseElementProps<T extends FieldValues = FieldValues> = Omit<
  InputBaseProps,
  'name' | 'defaultValue'
> & {
  showValid?: boolean
} & UseControllerProps<T>

export function InputBaseElement<TFieldValues extends FieldValues>(
  props: InputBaseElementProps<TFieldValues>,
): JSX.Element {
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
      required={required}
      type={type}
      error={Boolean(error) || rest.error}
    />
  )
}
