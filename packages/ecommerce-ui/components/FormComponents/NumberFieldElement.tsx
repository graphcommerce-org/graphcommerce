import {
  extendableComponent,
  iconMin,
  iconPlus,
  IconSvg,
  responsiveVal,
} from '@graphcommerce/next-ui'
import { ControllerProps, FieldValues, useController } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import { IconButtonProps, SxProps, Theme, TextField, TextFieldProps, Fab } from '@mui/material'

export type NumberFieldElementProps<T extends FieldValues = FieldValues> = Omit<
  TextFieldProps,
  'type' | 'defaultValue'
> & {
  DownProps?: IconButtonProps
  UpProps?: IconButtonProps
  sx?: SxProps<Theme>
  min?: number
  max?: number
  step?: number
} & Omit<ControllerProps<T>, 'render'>

type OwnerState = { size?: 'small' | 'medium' }
const componentName = 'TextInputNumber'
const parts = ['quantity', 'quantityInput', 'button'] as const
const { withState } = extendableComponent<OwnerState, typeof componentName, typeof parts>(
  componentName,
  parts,
)

export function NumberFieldElement<T extends FieldValues>(props: NumberFieldElementProps<T>) {
  const {
    DownProps = {},
    UpProps = {},
    inputProps = {},
    sx = [],
    size = 'medium',
    control,
    name,
    rules = {},
    required,
    defaultValue,
    variant = 'outlined',
    disabled,
    shouldUnregister,
    min,
    max,
    step,
    ...textFieldProps
  } = props

  const classes = withState({ size })

  if (required && !rules.required) {
    rules.required = i18n._(/* i18n */ 'This field is required')
  }

  const {
    field: { value, onChange, ref, ...field },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
    disabled,
    shouldUnregister,
  })

  const valueAsNumber = value ? parseFloat(value) : 0

  return (
    <TextField
      {...textFieldProps}
      {...field}
      inputRef={ref}
      value={value ?? ''}
      onChange={(ev) => {
        const newValue = (ev.target as HTMLInputElement).valueAsNumber
        onChange(Number.isNaN(newValue) ? '' : newValue)
        textFieldProps.onChange?.(ev)
      }}
      variant={variant}
      required={required}
      error={invalid}
      helperText={error ? error.message : textFieldProps.helperText}
      size={size}
      type='number'
      className={`${textFieldProps.className ?? ''} ${classes.quantity}`}
      sx={[
        {
          width: responsiveVal(90, 120),
          '& input[type=number]': {
            MozAppearance: 'textfield',
          },
          '& .MuiOutlinedInput-root': {
            px: '2px',
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr',
          },
        },
        variant === 'standard' && {
          '& .MuiOutlinedInput-input': {
            padding: 0,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            display: 'none',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      autoComplete='off'
      slotProps={{
        input: {
          ...textFieldProps.slotProps?.input,
          min,
          max,
          step,
          startAdornment: (
            <Fab
              aria-label={i18n._(/* i18n */ 'Decrease')}
              size='smaller'
              onClick={() => {
                const minVal = min ?? -Infinity
                if (
                  (valueAsNumber ?? Infinity) <= minVal ||
                  (minVal === 0 && valueAsNumber <= minVal)
                )
                  return
                onChange(value - 1)
              }}
              sx={{
                boxShadow: variant === 'standard' ? 4 : 0,
                minHeight: '30px',
                minWidth: '30px',
              }}
              tabIndex={-1}
              color='inherit'
              {...DownProps}
              className={`${classes.button} ${DownProps.className ?? ''}`}
            >
              {DownProps.children ?? <IconSvg src={iconMin} size='small' />}
            </Fab>
          ),
          endAdornment: (
            <Fab
              aria-label={i18n._(/* i18n */ 'Increase')}
              size='smaller'
              onClick={() => {
                const maxVal = max ?? Infinity
                if (valueAsNumber >= maxVal) return
                onChange(valueAsNumber + 1)
              }}
              sx={{
                boxShadow: variant === 'standard' ? 4 : 0,
                minHeight: '30px',
                minWidth: '30px',
              }}
              tabIndex={-1}
              color='inherit'
              {...UpProps}
              className={`${classes.button} ${UpProps.className ?? ''}`}
            >
              {UpProps.children ?? <IconSvg src={iconPlus} size='small' />}
            </Fab>
          ),
        },

        htmlInput: {
          'aria-label': i18n._(/* i18n */ 'Number'),
          ...inputProps,
          className: `${inputProps?.className ?? ''} ${classes.quantityInput}`,
          sx: {
            typography: 'body1',
            textAlign: 'center',
            '&::-webkit-inner-spin-button,&::-webkit-outer-spin-button': {
              appearance: 'none',
            },
          },
        },
      }}
    />
  )
}
