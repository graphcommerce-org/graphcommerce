import {
  extendableComponent,
  iconMin,
  iconPlus,
  IconSvg,
  responsiveVal,
} from '@graphcommerce/next-ui'
import type { ControllerProps, FieldValues } from '@graphcommerce/react-hook-form'
import { Controller, useController } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import type { IconButtonProps, SxProps, TextFieldProps, Theme } from '@mui/material'
import { Fab, TextField, useForkRef } from '@mui/material'

export type NumberFieldElementProps<T extends FieldValues = FieldValues> = Omit<
  TextFieldProps,
  'type' | 'defaultValue'
> & {
  DownProps?: IconButtonProps
  UpProps?: IconButtonProps
  sx?: SxProps<Theme>
} & Omit<ControllerProps<T>, 'render'>

type OwnerState = { size?: 'small' | 'medium' }
const componentName = 'TextInputNumber'
const parts = ['quantity', 'quantityInput', 'button'] as const
const { withState } = extendableComponent<OwnerState, typeof componentName, typeof parts>(
  componentName,
  parts,
)

/** @public */
export function NumberFieldElement<T extends FieldValues>(props: NumberFieldElementProps<T>) {
  const {
    DownProps = {},
    UpProps = {},
    inputProps = {},
    InputProps = {},
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
    ...rest
  } = props

  const classes = withState({ size })

  let InputPropsFiltered = InputProps

  if (variant === 'outlined' && 'disableUnderline' in InputPropsFiltered) {
    const { disableUnderline, ...filteredInputProps } = InputPropsFiltered
    InputPropsFiltered = filteredInputProps
  }

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
      {...rest}
      {...field}
      inputRef={useForkRef(ref, rest.inputRef)}
      value={value ?? ''}
      onChange={(ev) => {
        const newValue = (ev.target as HTMLInputElement).valueAsNumber
        onChange(Number.isNaN(newValue) ? '' : newValue)
        rest.onChange?.(ev)
      }}
      variant={variant}
      required={required}
      error={invalid}
      helperText={error ? error.message : rest.helperText}
      size={size}
      type='number'
      className={`${rest.className ?? ''} ${classes.quantity}`}
      sx={[
        {
          width: responsiveVal(90, 120),
        },
        {
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
      InputProps={{
        ...InputPropsFiltered,
        startAdornment: (
          <Fab
            aria-label={i18n._(/* i18n */ 'Decrease')}
            size='smaller'
            onClick={() => {
              if (
                (valueAsNumber ?? Infinity) <= inputProps.min ||
                (inputProps.min === 0 && valueAsNumber <= inputProps.min)
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
              if (valueAsNumber >= (inputProps.max ?? Infinity)) return
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
      }}
      inputProps={{
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
      }}
    />
  )
}
