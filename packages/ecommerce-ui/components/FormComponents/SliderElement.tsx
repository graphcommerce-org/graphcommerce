import {
  Controller,
  ControllerProps,
  FieldError,
  FieldValues,
} from '@graphcommerce/react-hook-form'
import FormControl, { FormControlProps } from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormLabel from '@mui/material/FormLabel'
import Slider, { SliderProps } from '@mui/material/Slider'

export type SliderElementProps<T extends FieldValues> = Omit<SliderProps, 'control'> & {
  label?: string
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
    rules.required = 'This field is required'
  }
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { invalid, error } }) => {
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
            <Slider
              {...other}
              value={value}
              onChange={onChange}
              valueLabelDisplay={other.valueLabelDisplay || 'auto'}
            />
            {parsedHelperText && (
              <FormHelperText error={invalid}>{parsedHelperText}</FormHelperText>
            )}
          </FormControl>
        )
      }}
    />
  )
}
