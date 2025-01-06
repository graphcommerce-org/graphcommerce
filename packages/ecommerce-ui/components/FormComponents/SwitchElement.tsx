import type { FieldValues } from '@graphcommerce/react-hook-form'
import { useController } from '@graphcommerce/react-hook-form'
import type { FormControlLabelProps, SwitchProps } from '@mui/material'
import { FormControlLabel, Switch } from '@mui/material'
import React from 'react'
import type { FieldElementProps } from './types'

type AdditionalProps = Omit<FormControlLabelProps, 'control'>

export type SwitchElementProps<TFieldValues extends FieldValues = FieldValues> = FieldElementProps<
  TFieldValues,
  SwitchProps
> &
  AdditionalProps

type SwitchElementComponent = <TFieldValues extends FieldValues>(
  props: SwitchElementProps<TFieldValues>,
) => React.ReactNode

function SwitchElementBase(props: SwitchElementProps): JSX.Element {
  const { name, control, defaultValue, disabled, shouldUnregister, rules, ...other } = props

  const { field } = useController({
    name,
    control,
    defaultValue,
    disabled,
    shouldUnregister,
    rules,
  })

  return <FormControlLabel control={<Switch {...field} checked={!!field.value} />} {...other} />
}

/** @public */
export const SwitchElement = SwitchElementBase as SwitchElementComponent
