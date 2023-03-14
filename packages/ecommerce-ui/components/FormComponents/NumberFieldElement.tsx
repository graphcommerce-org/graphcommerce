import {
  extendableComponent,
  iconMin,
  iconPlus,
  IconSvg,
  responsiveVal,
} from '@graphcommerce/next-ui'
import { Controller, ControllerProps, FieldValues } from '@graphcommerce/react-hook-form'
import { i18n } from '@lingui/core'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { SxProps, Theme } from '@mui/material/styles'

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
            sx={[{ width: responsiveVal(80, 120) }, ...(Array.isArray(sx) ? sx : [sx])]}
            autoComplete='off'
            InputProps={{
              ...textFieldProps.InputProps,
              startAdornment: (
                <IconButton
                  aria-label={i18n._(/* i18n */ 'Decrease')}
                  size='medium'
                  edge='start'
                  onClick={() => {
                    if ((valueAsNumber || Infinity) <= inputProps.min) return
                    onChange(value - 1)
                  }}
                  tabIndex={-1}
                  color='inherit'
                  {...DownProps}
                  className={`${classes.button} ${DownProps.className ?? ''}`}
                >
                  {DownProps.children ?? <IconSvg src={iconMin} size='small' />}
                </IconButton>
              ),
              endAdornment: (
                <IconButton
                  aria-label={i18n._(/* i18n */ 'Increase')}
                  size='medium'
                  edge='end'
                  onClick={() => {
                    if (valueAsNumber >= (inputProps.max ?? Infinity)) return
                    onChange(valueAsNumber + 1)
                  }}
                  tabIndex={-1}
                  color='inherit'
                  {...UpProps}
                  className={`${classes.button} ${UpProps.className ?? ''}`}
                >
                  {UpProps.children ?? <IconSvg src={iconPlus} size='small' />}
                </IconButton>
              ),
            }}
            inputProps={{
              ...inputProps,
              'aria-label': i18n._(/* i18n */ 'Number'),
              className: `${inputProps?.className ?? ''} ${classes.quantityInput}`,
              sx: {
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
