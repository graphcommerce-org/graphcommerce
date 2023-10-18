import {
  Control,
  Controller,
  ControllerProps,
  FieldError,
  FieldValues,
  Path,
  PathValue,
} from '@graphcommerce/react-hook-form'
import { TextFieldProps } from '@mui/material'
import TextField from '@mui/material/TextField'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import { format } from 'date-fns'
import { useRouter } from 'next/router'

export declare type ParseableDate<TDate> = string | number | Date | null | undefined | TDate

export type DatePickerElementProps<T extends FieldValues, TInputDate, TDate = TInputDate> = Omit<
  DatePickerProps<TInputDate, TDate>,
  'value' | 'onChange' | 'renderInput'
> & {
  name: Path<T>
  required?: boolean
  isDate?: boolean
  parseError?: (error: FieldError) => string
  onChange?: (value: TDate, keyboardInputValue?: string) => void
  validation?: ControllerProps['rules']
  parseDate?: (value: TDate, keyboardInputValue?: string) => TDate
  control?: T extends FieldValues ? Control<T> : undefined
  helperText?: TextFieldProps['helperText']
  defaultValue?: PathValue<T, Path<T>>
  color?: 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | undefined
}

function isValidDate(date: Date | undefined) {
  if (!date || Number.isNaN(date.getTime())) return undefined
  return date
}

export function DatePickerElement<TFieldValues extends FieldValues>(
  props: DatePickerElementProps<TFieldValues, any>,
): JSX.Element {
  const {
    isDate,
    parseError,
    name,
    required,
    parseDate,
    color,
    validation = {},
    control,
    defaultValue,
    ...rest
  } = props
  if (required && !validation.required) {
    validation.required = 'This field is required'
  }

  const router = useRouter()

  return (
    <Controller
      name={name}
      rules={validation}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value }, fieldState: { error, invalid } }) => (
        <DatePicker
          {...rest}
          value={value}
          onChange={(i: Date, kb?: string) => {
            onChange(i)
          }}
          renderInput={(renderProps) => (
            <TextField
              {...renderProps}
              required={!!required}
              sx={{
                display: 'flex',
                flex: 1,
                marginRight: { xs: 0, md: 1 },
              }}
              error={invalid}
              color={color}
              helperText={
                // eslint-disable-next-line no-nested-ternary
                error
                  ? typeof parseError === 'function'
                    ? parseError(error)
                    : error.message
                  : rest.helperText
              }
            />
          )}
        />
      )}
    />
  )
}
