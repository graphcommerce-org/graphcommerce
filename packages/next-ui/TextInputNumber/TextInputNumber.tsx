import { i18n } from '@lingui/core'
import {
  IconButton,
  IconButtonProps,
  SxProps,
  TextField,
  TextFieldProps,
  useForkRef,
  Theme,
} from '@mui/material'
import { ChangeEvent, Ref, useCallback, useEffect, useRef, useState } from 'react'
import { IconSvg } from '../IconSvg'
import { extendableComponent } from '../Styles'
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
const name = 'TextInputNumber' as const
const parts = ['quantity', 'quantityInput', 'button'] as const
const { withState } = extendableComponent<OwnerState, typeof name, typeof parts>(name, parts)

export function TextInputNumber(props: TextInputNumberProps) {
  const {
    DownProps = {},
    UpProps = {},
    inputProps = {},
    inputRef,
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
      inputRef={forkRef}
      className={`${textFieldProps.className ?? ''} ${classes.quantity}`}
      sx={[
        (theme) => ({
          width: theme.responsiveTemplate`${[200, 900]}px`,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      autoComplete='off'
      InputProps={{
        ...textFieldProps.InputProps,
        startAdornment: (
          <IconButton
            aria-label={i18n._(/* i18n */ 'Decrease')}
            size='medium'
            edge='start'
            onPointerDown={() => setDirection('down')}
            onPointerUp={stop}
            // disabled={textFieldProps.disabled || disabled === 'min'}
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
            onPointerDown={() => setDirection('up')}
            onPointerUp={() => setDirection(null)}
            // disabled={textFieldProps.disabled || disabled === 'max'}
            tabIndex={-1}
            color='inherit'
            {...UpProps}
            className={`${classes.button} ${UpProps.className ?? ''}`}
          >
            {UpProps.children ?? <IconSvg src={iconPlus} size='small' />}
          </IconButton>
        ),
      }}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        if (textFieldProps.onChange) textFieldProps.onChange(e)
        updateDisabled(e.target)
      }}
      inputProps={{
        ...inputProps,
        'aria-label': i18n._(/* i18n */ 'Number'),
        sx: [
          {
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
