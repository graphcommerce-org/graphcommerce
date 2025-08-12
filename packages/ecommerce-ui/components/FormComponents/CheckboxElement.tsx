import type { FieldValues } from '@graphcommerce/react-hook-form'
import { useController } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import type {
  CheckboxProps,
  FormControlLabelProps,
  FormControlProps,
  SxProps,
  Theme,
} from '@mui/material'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  useForkRef,
} from '@mui/material'
import type { FieldElementProps } from './types'

type AdditionalProps = {
  label?: FormControlLabelProps['label']
  helperText?: string
  sx?: SxProps<Theme>
  formControl?: Omit<FormControlProps<'div'>, 'required' | 'error'>
}

export type CheckboxElementProps<TFieldValues extends FieldValues = FieldValues> =
  FieldElementProps<TFieldValues, CheckboxProps> & AdditionalProps

type CheckboxElementComponent = <TFieldValues extends FieldValues>(
  props: CheckboxElementProps<TFieldValues>,
) => React.ReactNode

function CheckboxElementBase(props: CheckboxElementProps): JSX.Element {
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
    shouldUnregister,
    ...rest
  } = props

  if (required && !rules.required) {
    rules.required = i18n._(/* i18n */ 'This field is required')
  }

  const {
    field: { value, onChange, ref, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    rules,
    control,
    defaultValue,
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
              onBlur={onBlur}
              name={name}
              inputRef={useForkRef(ref, rest.inputRef)}
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

/** @public */
export const CheckboxElement = CheckboxElementBase as CheckboxElementComponent
