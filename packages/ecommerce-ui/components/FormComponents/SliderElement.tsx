import {
  Controller,
  ControllerProps,
  FieldError,
  FieldValues,
} from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import {
  FormControl,
  FormControlProps,
  FormHelperText,
  FormLabel,
  Slider,
  SliderProps,
} from '@mui/material'

export type SliderElementProps<T extends FieldValues> = Omit<SliderProps, 'control'> & {
  label?: string
  /** @deprecated Form value parsing should happen in the handleSubmit function of the form */
  parseError?: (error: FieldError) => string
  required?: boolean
  formControlProps?: FormControlProps
} & Omit<ControllerProps<T>, 'render'>

export function SliderElement<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  rules = {},
  parseError,
  required,
  formControlProps,
  ...other
}: SliderElementProps<TFieldValues>) {
  if (required && !rules.required) {
    rules.required = i18n._(/* i18n */ 'This field is required')
  }
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { invalid, error } }) => {
        const parsedHelperText = error
          ? typeof parseError === 'function'
            ? parseError(error)
            : error.message
          : null
        return (
          <FormControl error={invalid} required={required} fullWidth {...formControlProps}>
            {label && (
              <FormLabel component='legend' error={invalid}>
                {label}
              </FormLabel>
            )}
            <Slider {...other} {...field} valueLabelDisplay={other.valueLabelDisplay || 'auto'} />
            {parsedHelperText && (
              <FormHelperText error={invalid}>{parsedHelperText}</FormHelperText>
            )}
          </FormControl>
        )
      }}
    />
  )
}
