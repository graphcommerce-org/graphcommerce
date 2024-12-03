import { i18n } from '@lingui/core'
import type { IconButtonProps, SxProps, TextFieldProps, Theme } from '@mui/material'
import {
  Box,
  Fab, // eslint-disable-next-line @typescript-eslint/no-restricted-imports
  TextField,
  useForkRef,
} from '@mui/material'
import type { ChangeEvent, Ref } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { IconSvg } from '../IconSvg'
import { extendableComponent } from '../Styles'
import { responsiveVal } from '../Styles/responsiveVal'
import { iconMin, iconPlus } from '../icons'

export type IconButtonPropsOmit = Omit<
  IconButtonProps,
  'aria-labelledby' | 'aria-label' | 'size' | 'onMouseDown' | 'onMouseUp' | 'disabled'
>

export type TextInputNumberProps = Omit<TextFieldProps, 'type'> & {
  DownProps?: IconButtonPropsOmit
  UpProps?: IconButtonPropsOmit
  sx?: SxProps<Theme>
}

type OwnerState = { size?: 'small' | 'medium' }
const name = 'TextInputNumber'
const parts = ['quantity', 'quantityInput', 'button'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

/**
 * @deprecated Please us NumberFieldElement
 */
export function TextInputNumber(props: TextInputNumberProps) {
  const {
    DownProps = {},
    UpProps = {},
    inputProps = {},
    inputRef,
    variant = 'outlined',
    sx = [],
    ...textFieldProps
  } = props

  const classes = withState({})

  const ref = useRef<HTMLInputElement>(null)
  const forkRef = useForkRef(ref, inputRef as Ref<HTMLInputElement>)

  const [direction, setDirection] = useState<'up' | 'down' | 'runUp' | 'runDown' | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [disabled, setDisabled] = useState<'min' | 'max' | null>(null)

  const stop = useCallback(() => setDirection(null), [])

  const down = useCallback(() => {
    if ((ref.current?.value ?? 0) <= inputProps.min) {
      setDirection(null)
      return
    }

    ref.current?.stepDown()
    ref.current?.dispatchEvent(new Event('change', { bubbles: true }))
  }, [inputProps.min])

  const up = useCallback(() => {
    if ((ref.current?.value ?? Infinity) >= inputProps.max) {
      setDirection(null)
      return
    }

    ref.current?.stepUp()
    ref.current?.dispatchEvent(new Event('change', { bubbles: true }))
  }, [inputProps.max])

  useEffect(() => {
    if (direction === 'up') up()
    if (direction === 'down') down()
  }, [direction, down, inputProps.max, inputProps.min, ref, stop, up])

  const updateDisabled = (target: HTMLInputElement) => {
    if (target.value === target.min) setDisabled('min')
    else if (target.value === target.max) setDisabled('max')
    else setDisabled(null)
  }

  useEffect(() => {
    if (!ref.current) return
    setTimeout(() => ref.current && updateDisabled(ref.current))
  }, [ref, inputProps.min, inputProps.max])

  return (
    <TextField
      {...textFieldProps}
      type='number'
      variant={variant}
      inputRef={forkRef}
      className={`${textFieldProps.className ?? ''} ${classes.quantity}`}
      sx={[
        {
          width: responsiveVal(90, 120),
        },
        {
          '& input[type=number]': {
            MozAppearance: 'textfield',
          },
          '& .MuiOutlinedInput-root': {
            px: '3px',
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
          <Box>
            <Fab
              aria-label={i18n._(/* i18n */ 'Decrease')}
              size='smaller'
              sx={{ boxShadow: variant === 'standard' ? 4 : 0, minHeight: '30px' }}
              onPointerDown={() => setDirection('down')}
              onPointerUp={stop}
              tabIndex={-1}
              {...DownProps}
              className={`${classes.button} ${DownProps.className ?? ''}`}
            >
              {DownProps.children ?? <IconSvg src={iconMin} size='small' />}
            </Fab>
          </Box>
        ),
        endAdornment: (
          <Box>
            <Fab
              aria-label={i18n._(/* i18n */ 'Increase')}
              size='smaller'
              sx={{ boxShadow: variant === 'standard' ? 4 : 0, minHeight: '30px' }}
              onPointerDown={() => setDirection('up')}
              onPointerUp={() => setDirection(null)}
              tabIndex={-1}
              {...UpProps}
              className={`${classes.button} ${UpProps.className ?? ''}`}
            >
              {UpProps.children ?? <IconSvg src={iconPlus} size='small' />}
            </Fab>
          </Box>
        ),
      }}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        if (textFieldProps.onChange) textFieldProps.onChange(e)
        updateDisabled(e.target)
      }}
      inputProps={{
        'aria-label': i18n._(/* i18n */ 'Number'),
        ...inputProps,
        sx: [
          {
            typography: 'body1',
            textAlign: 'center',
            '&::-webkit-inner-spin-button,&::-webkit-outer-spin-button': {
              appearance: 'none',
            },
          },
        ],
        className: `${inputProps?.className ?? ''} ${classes.quantityInput}`,
      }}
    />
  )
}
