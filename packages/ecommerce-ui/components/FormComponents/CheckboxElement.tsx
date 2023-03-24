import {
  Controller,
  ControllerProps,
  FieldError,
  FieldValues,
} from '@graphcommerce/react-hook-form'
import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormGroup,
  FormHelperText,
  SxProps,
  Theme,
} from '@mui/material'

export type CheckboxElementProps<T extends FieldValues> = Omit<CheckboxProps, 'name'> & {
  parseError?: (error: FieldError) => string
  label?: FormControlLabelProps['label']
  helperText?: string
  sx?: SxProps<Theme>
  sxFormControl?: SxProps<Theme>
} & Omit<ControllerProps<T>, 'render'>

export function CheckboxElement<TFieldValues extends FieldValues>({
  name,
  rules = {},
  required,
  parseError,
  label,
  control,
  helperText,
  sx,
  sxFormControl,
  ...rest
}: CheckboxElementProps<TFieldValues>): JSX.Element {
  if (required && !rules.required) {
    rules.required = 'This field is required'
  }

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field: { value, onChange }, fieldState: { invalid, error } }) => {
        const parsedHelperText = error
          ? typeof parseError === 'function'
            ? parseError(error)
            : error.message
          : helperText
        return (
          <FormControl required={required} error={invalid} sx={{ ...sxFormControl }}>
            <FormGroup row>
              <FormControlLabel
                label={label || ''}
                control={
                  <Checkbox
                    {...rest}
                    color={rest.color || 'primary'}
                    sx={{
                      ...sx,
                      color: invalid ? 'error.main' : undefined,
                    }}
                    value={value}
                    checked={!!value}
                    onChange={() => {
                      onChange(!value)
                    }}
                  />
                }
              />
            </FormGroup>
            {parsedHelperText && (
              <FormHelperText error={invalid}>{parsedHelperText}</FormHelperText>
            )}
          </FormControl>
        )
      }}
    />
  )
}
