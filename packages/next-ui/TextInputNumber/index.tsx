import {
  IconButton,
  IconButtonProps,
  makeStyles,
  TextField,
  TextFieldProps,
  Theme,
  useForkRef,
} from '@material-ui/core'
import clsx from 'clsx'
import React, { ChangeEvent, Ref, useCallback, useEffect, useRef, useState } from 'react'
import { UseStyles } from '../Styles'
import responsiveVal from '../Styles/responsiveVal'
import SvgImage from '../SvgImage'
import { iconMin, iconPlus } from '../icons'

const useStyles = makeStyles(
  (theme: Theme) => ({
    quantity: {
      width: responsiveVal(80, 120),
      backgroundColor: theme.palette.background.default,
    },
    quantityInput: {
      textAlign: 'center',
      '&::-webkit-inner-spin-button,&::-webkit-outer-spin-button': {
        appearance: 'none',
      },
    },
    button: {
      fontSize: 22,
    },
    adornedEnd: {
      paddingRight: responsiveVal(7, 14),
    },
    adornedStart: {
      paddingLeft: responsiveVal(7, 14),
    },
  }),
  { name: 'TextInputNumber' },
)

export type IconButtonPropsOmit = Omit<
  IconButtonProps,
  'aria-label' | 'size' | 'onMouseDown' | 'onMouseUp' | 'disabled'
>

export type TextInputNumberProps = Omit<TextFieldProps, 'type'> & {
  DownProps?: IconButtonPropsOmit
  UpProps?: IconButtonPropsOmit
} & UseStyles<typeof useStyles>

export default function TextInputNumber(props: TextInputNumberProps) {
  const {
    InputProps = {},
    DownProps = {},
    UpProps = {},
    inputProps = {},
    inputRef,
    ...textFieldProps
  } = props
  const classes = useStyles(props)
  const ref = useRef<HTMLInputElement>(null)
  const forkRef = useForkRef<HTMLInputElement>(ref, inputRef as Ref<HTMLInputElement>)

  const [direction, setDirection] = useState<'up' | 'down' | 'runUp' | 'runDown' | null>(null)
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
      className={clsx(textFieldProps.className, classes.quantity)}
      autoComplete='off'
      InputProps={{
        ...InputProps,
        classes: {
          adornedEnd: classes.adornedEnd,
          adornedStart: classes.adornedStart,
        },
        startAdornment: (
          <IconButton
            aria-label='step down'
            size='small'
            edge='start'
            onPointerDown={() => setDirection('down')}
            onPointerUp={stop}
            // disabled={textFieldProps.disabled || disabled === 'min'}
            tabIndex='-1'
            color='inherit'
            className={clsx(classes.button, DownProps.className)}
            {...DownProps}
          >
            {DownProps.children ?? (
              <SvgImage src={iconMin} size='small' alt='Step down' loading='eager' />
            )}
          </IconButton>
        ),
        endAdornment: (
          <IconButton
            aria-label='step up'
            size='small'
            edge='end'
            onPointerDown={() => setDirection('up')}
            onPointerUp={() => setDirection(null)}
            // disabled={textFieldProps.disabled || disabled === 'max'}
            tabIndex='-1'
            color='inherit'
            className={clsx(classes.button, UpProps.className)}
            {...UpProps}
          >
            {UpProps.children ?? (
              <SvgImage src={iconPlus} size='small' alt='Step up' loading='eager' />
            )}
          </IconButton>
        ),
      }}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        if (textFieldProps.onChange) textFieldProps.onChange(e)
        updateDisabled(e.target)
      }}
      inputProps={{
        ...inputProps,
        className: clsx(inputProps?.className, classes.quantityInput),
      }}
    />
  )
}
