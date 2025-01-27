import type { FieldValues } from '@graphcommerce/react-hook-form'
import { useController } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import type { FormControlProps, SliderProps } from '@mui/material'
import { FormControl, FormHelperText, FormLabel, Slider } from '@mui/material'
import React from 'react'
import type { FieldElementProps } from './types'

type AdditionalProps = {
  label?: string
  required?: boolean
  formControlProps?: FormControlProps
}

export type SliderElementProps<TFieldValues extends FieldValues = FieldValues> = FieldElementProps<
  TFieldValues,
  Omit<SliderProps, 'name'>
> &
  AdditionalProps

type SliderElementComponent = <TFieldValues extends FieldValues>(
  props: SliderElementProps<TFieldValues>,
) => React.ReactNode

function SliderElementBase(props: SliderElementProps): JSX.Element {
  const {
    name,
    control,
    label,
    rules = {},
    required,
    formControlProps,
    defaultValue,
    disabled: disabledField,
    shouldUnregister,
    ...other
  } = props

  if (required && !rules.required) {
    rules.required = i18n._(/* i18n */ 'This field is required')
  }

  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
    disabled: disabledField,
    shouldUnregister,
  })

  const parsedHelperText = error ? error.message : null

  return (
    <FormControl error={invalid} required={required} fullWidth {...formControlProps}>
      {label && (
        <FormLabel component='legend' error={invalid}>
          {label}
        </FormLabel>
      )}
      <Slider {...other} {...field} valueLabelDisplay={other.valueLabelDisplay || 'auto'} />
      {parsedHelperText && <FormHelperText error={invalid}>{parsedHelperText}</FormHelperText>}
    </FormControl>
  )
}

/** @public */
export const SliderElement = SliderElementBase as SliderElementComponent
