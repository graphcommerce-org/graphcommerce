import { Controller, FieldValues, ControllerProps } from '@graphcommerce/react-hook-form'
import { FormControlLabel, FormControlLabelProps, Switch } from '@mui/material'

type IProps = Omit<FormControlLabelProps, 'control'>

export type SwitchElementProps<T extends FieldValues> = IProps & Omit<ControllerProps<T>, 'render'>

export function SwitchElement<TFieldValues extends FieldValues>({
  name,
  control,
  ...other
}: SwitchElementProps<TFieldValues>) {
  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => <Switch {...field} checked={!!field.value} />}
        />
      }
      {...other}
    />
  )
}
