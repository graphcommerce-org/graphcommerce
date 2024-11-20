import type { FieldValues, ControllerProps } from '@graphcommerce/react-hook-form'
import { useController } from '@graphcommerce/react-hook-form'
import type { FormControlLabelProps } from '@mui/material'
import { FormControlLabel, Switch } from '@mui/material'

type IProps = Omit<FormControlLabelProps, 'control'>

export type SwitchElementProps<T extends FieldValues> = IProps & Omit<ControllerProps<T>, 'render'>

export function SwitchElement<TFieldValues extends FieldValues>({
  name,
  control,
  defaultValue,
  disabled,
  shouldUnregister,
  rules,
  ...other
}: SwitchElementProps<TFieldValues>) {
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
