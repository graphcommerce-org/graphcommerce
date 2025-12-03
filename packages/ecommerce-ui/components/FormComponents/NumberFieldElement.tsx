import {
  extendableComponent,
  iconMin,
  iconPlus,
  IconSvg,
  responsiveVal,
} from '@graphcommerce/next-ui'
import type { FieldValues } from '@graphcommerce/react-hook-form'
import { useController } from '@graphcommerce/react-hook-form'
import { t } from '@lingui/core/macro'
import type { IconButtonProps, SxProps, TextFieldProps, Theme } from '@mui/material'
import { Fab, TextField, useForkRef } from '@mui/material'
import React from 'react'
import type { FieldElementProps } from './types'

type AdditionalProps = {
  DownProps?: IconButtonProps
  UpProps?: IconButtonProps
  sx?: SxProps<Theme>
}

export type NumberFieldElementProps<TFieldValues extends FieldValues = FieldValues> =
  FieldElementProps<TFieldValues, Omit<TextFieldProps, 'type'>> & AdditionalProps

type NumberFieldElementComponent = <TFieldValues extends FieldValues>(
  props: NumberFieldElementProps<TFieldValues>,
) => React.ReactNode

type OwnerState = { size?: 'small' | 'medium' }
const componentName = 'TextInputNumber'
const parts = ['quantity', 'quantityInput', 'button'] as const
const { withState } = extendableComponent<OwnerState, typeof componentName, typeof parts>(
  componentName,
  parts,
)

const roundStep = (value: number, step: number) => {
  // Round to nearest step
  const newStepValue = Math.round(value / step) * step
  // Round to max 2 decimals
  return Math.round(newStepValue * 100) / 100
}

/** @public */
function NumberFieldElementBase(props: NumberFieldElementProps) {
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
    rules.required = t`This field is required`
  }

  const {
    field: { value, onChange, ref, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
    shouldUnregister,
  })

  const valueAsNumber = value ? parseFloat(value) : 0
  const step: number = inputProps.step ?? 1

  return (
    <TextField
      {...rest}
      onBlur={onBlur}
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
      slotProps={{
        input: {
          ...InputPropsFiltered,
          startAdornment: (
            <Fab
              aria-label={t`Decrease`}
              size='smaller'
              onClick={() => {
                if (
                  (valueAsNumber ?? Infinity) <= inputProps.min ||
                  (inputProps.min === 0 && valueAsNumber <= inputProps.min)
                )
                  return
                // Round to nearest step
                onChange(roundStep(valueAsNumber - step, step))
              }}
              sx={[
                {
                  minHeight: '30px',
                  minWidth: '30px',
                },
                variant === 'standard'
                  ? {
                      boxShadow: 4,
                    }
                  : {
                      boxShadow: 0,
                    },
              ]}
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
              aria-label={t`Increase`}
              size='smaller'
              onClick={() => {
                if (valueAsNumber >= (inputProps.max ?? Infinity)) return
                // Round to nearest step
                onChange(roundStep(valueAsNumber + step, step))
              }}
              sx={[
                {
                  minHeight: '30px',
                  minWidth: '30px',
                },
                variant === 'standard'
                  ? {
                      boxShadow: 4,
                    }
                  : {
                      boxShadow: 0,
                    },
              ]}
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
          'aria-label': t`Number`,
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

export const NumberFieldElement = React.forwardRef<HTMLInputElement, NumberFieldElementProps>(
  (props, ref) => NumberFieldElementBase({ ...props, ref }),
) as NumberFieldElementComponent
