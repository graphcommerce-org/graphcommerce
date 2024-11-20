import type { ControllerProps, FieldValues } from '@graphcommerce/react-hook-form'
import { FieldError, useController } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import type { FormControlProps, SliderProps } from '@mui/material'
import { FormControl, FormHelperText, FormLabel, Slider } from '@mui/material'

export type SliderElementProps<T extends FieldValues> = Omit<SliderProps, 'control'> & {
  label?: string
  required?: boolean
  formControlProps?: FormControlProps
} & Omit<ControllerProps<T>, 'render'>

export function SliderElement<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  rules = {},
  required,
  formControlProps,
  defaultValue,
  disabled,
  shouldUnregister,
  ...other
}: SliderElementProps<TFieldValues>) {
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
    disabled,
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
