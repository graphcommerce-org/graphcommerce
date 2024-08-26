import { ControllerProps, FieldValues, useController } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlLabelProps,
  FormControlProps,
  FormGroup,
  FormHelperText,
  SxProps,
  Theme,
} from '@mui/material'

export type CheckboxElementProps<T extends FieldValues> = Omit<CheckboxProps, 'name'> & {
  label?: FormControlLabelProps['label']
  helperText?: string
  sx?: SxProps<Theme>
  formControl?: Omit<FormControlProps<'div'>, 'required' | 'error'>
} & Omit<ControllerProps<T>, 'render'>

export function CheckboxElement<TFieldValues extends FieldValues>(
  props: CheckboxElementProps<TFieldValues>,
): JSX.Element {
  const {
    name,
    rules = {},
    required,
    label,
    control,
    helperText,
    sx,
    formControl,
    defaultValue,
    disabled,
    shouldUnregister,
    ...rest
  } = props

  if (required && !rules.required) {
    rules.required = i18n._(/* i18n */ 'This field is required')
  }

  const {
    field: { value, onChange, ref, ...field },
    fieldState: { invalid, error },
  } = useController({
    name,
    rules,
    control,
    defaultValue,
    disabled,
    shouldUnregister,
  })

  const parsedHelperText = error ? error.message : helperText

  return (
    <FormControl required={required} error={invalid} {...formControl}>
      <FormGroup row>
        <FormControlLabel
          label={label || ''}
          control={
            <Checkbox
              {...rest}
              {...field}
              inputRef={ref}
              color={rest.color || 'primary'}
              sx={{
                ...(Array.isArray(sx) ? sx : [sx]),
                color: invalid ? 'error.main' : undefined,
              }}
              value={value}
              checked={!!value}
              onChange={() => onChange(!value)}
            />
          }
        />
      </FormGroup>
      {parsedHelperText && <FormHelperText error={invalid}>{parsedHelperText}</FormHelperText>}
    </FormControl>
  )
}
