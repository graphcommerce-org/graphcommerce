import {
  IconButton,
  IconButtonProps,
  makeStyles,
  OutlinedTextFieldProps,
  TextField,
  TextFieldProps,
  Theme,
  useForkRef,
} from '@material-ui/core'
import clsx from 'clsx'
import React, { ChangeEvent, Ref, useCallback, useEffect, useRef, useState } from 'react'
import { UseStyles } from '../Styles'
import responsiveVal from '../Styles/responsiveVal'
import SvgImageSimple from '../SvgImage/SvgImageSimple'
import { iconMin, iconPlus } from '../icons'

const useStyles = makeStyles(
  (theme: Theme) => ({
    quantity: {
      width: responsiveVal(80, 120),
      backgroundColor: 'inherit',
    },
    quantityInput: {
      textAlign: 'center',
      '&::-webkit-inner-spin-button,&::-webkit-outer-spin-button': {
        appearance: 'none',
      },
    },
    button: {},
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

function isOutlined(props: TextFieldProps): props is OutlinedTextFieldProps {
  return props.variant === 'outlined'
}

export default function TextInputNumber(props: TextInputNumberProps) {
  const { DownProps = {}, UpProps = {}, inputProps = {}, inputRef, ...textFieldProps } = props
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

  if (!textFieldProps.InputProps) textFieldProps.InputProps = {}
  if (isOutlined(textFieldProps)) {
    textFieldProps.InputProps.classes = {
      ...textFieldProps.InputProps?.classes,
      adornedEnd: classes.adornedEnd,
      adornedStart: classes.adornedStart,
    }
  }

  return (
    <TextField
      {...textFieldProps}
      type='number'
      inputRef={forkRef}
      className={clsx(textFieldProps.className, classes.quantity)}
      autoComplete='off'
      InputProps={{
        ...textFieldProps.InputProps,
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
            {DownProps.children ?? <SvgImageSimple src={iconMin} size='small' />}
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
            {UpProps.children ?? <SvgImageSimple src={iconPlus} size='small' />}
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
