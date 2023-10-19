import {
  extendableComponent,
  iconMin,
  iconPlus,
  IconSvg,
  responsiveVal,
} from '@graphcommerce/next-ui'
import { Controller, ControllerProps, FieldValues } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import {
  IconButton,
  IconButtonProps,
  SxProps,
  Theme,
  TextField,
  TextFieldProps,
  Fab,
} from '@mui/material'

export type NumberFieldElementProps<T extends FieldValues = FieldValues> = Omit<
  TextFieldProps,
  'type' | 'defaultValue'
> & {
  DownProps?: IconButtonProps
  UpProps?: IconButtonProps
  sx?: SxProps<Theme>
} & Omit<ControllerProps<T>, 'render'>

type OwnerState = { size?: 'small' | 'medium' }
const componentName = 'TextInputNumber' as const
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
    ...textFieldProps
  } = props

  const classes = withState({ size })

  if (required && !rules.required) {
    rules.required = i18n._(/* i18n */ 'This field is required')
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { value, onChange, onBlur }, fieldState: { invalid, error } }) => {
        const valueAsNumber = value ? parseFloat(value) : 0

        return (
          <TextField
            {...textFieldProps}
            variant={variant}
            name={name}
            value={value ?? ''}
            onChange={(ev) => {
              const newValue = (ev.target as HTMLInputElement).valueAsNumber
              onChange(Number.isNaN(newValue) ? '' : newValue)
              textFieldProps.onChange?.(ev)
            }}
            onBlur={onBlur}
            required={required}
            error={invalid}
            helperText={error ? error.message : textFieldProps.helperText}
            size={size}
            type='number'
            className={`${textFieldProps.className ?? ''} ${classes.quantity}`}
            sx={[
              {
                width: responsiveVal(90, 120),
              },
              {
                // Without this you get inputarrows on firefox
                '& input[type=number]': {
                  '-moz-appearance': 'textfield',
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
              ...textFieldProps.InputProps,
              startAdornment: (
                <Fab
                  aria-label={i18n._(/* i18n */ 'Decrease')}
                  size='smaller'
                  onClick={() => {
                    if ((valueAsNumber || Infinity) <= inputProps.min) return
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
              ...inputProps,
              'aria-label': i18n._(/* i18n */ 'Number'),
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
      }}
    />
  )
}
