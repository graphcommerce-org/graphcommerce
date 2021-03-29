import {
  IconButton,
  IconButtonProps,
  makeStyles,
  TextField,
  TextFieldProps,
  Theme,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import clsx from 'clsx'
import { ChangeEvent, RefObject, useCallback, useEffect, useRef, useState } from 'react'
import { UseStyles } from '../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    quantity: {
      width: 120,
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
  }),
  { name: 'TextInputNumber' },
)

type IconButtonPropsOmit = Omit<
  IconButtonProps,
  'aria-label' | 'size' | 'onMouseDown' | 'onMouseUp' | 'disabled'
>

type TextInputNumberProps = Omit<TextFieldProps, 'type'> & {
  DownProps?: IconButtonPropsOmit
  UpProps?: IconButtonPropsOmit
} & UseStyles<typeof useStyles>

export default function TextInputNumber(props: TextInputNumberProps) {
  const {
    InputProps = {},
    DownProps = {},
    UpProps = {},
    inputProps = {},
    ...textFieldProps
  } = props
  const classes = useStyles(props)
  const internalRef = useRef<HTMLInputElement>()
  const ref = (textFieldProps.inputRef as RefObject<HTMLInputElement>) ?? internalRef

  const [direction, setDirection] = useState<'up' | 'down' | 'runUp' | 'runDown' | null>(null)
  const [disabled, setDisabled] = useState<'min' | 'max' | null>(null)

  const stop = useCallback(() => {
    setDirection(null)
    ref.current?.focus()
  }, [ref])

  useEffect(() => {
    let clear: NodeJS.Timeout

    const down = () => {
      if ((ref.current?.value ?? 0) <= inputProps.min) {
        stop()
        return
      }
      ref.current?.stepDown()
      ref.current?.dispatchEvent(new Event('change', { bubbles: true }))
    }
    const up = () => {
      if ((ref.current?.value ?? Infinity) >= inputProps.max) {
        stop()
        return
      }

      ref.current?.stepUp()
      ref.current?.dispatchEvent(new Event('change', { bubbles: true }))
    }

    if (direction === 'up') {
      up()
      setTimeout(() => setDirection((old) => (old === 'up' ? 'runUp' : null)), 500)
    }
    if (direction === 'runUp') {
      clear = setInterval(up, 50)
    }
    if (direction === 'down') {
      down()
      setTimeout(() => setDirection((old) => (old === 'down' ? 'runDown' : null)), 500)
    }
    if (direction === 'runDown') {
      clear = setInterval(down, 50)
    }

    return () => clearInterval(clear)
  }, [direction, inputProps.max, inputProps.min, ref, stop])

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
      inputRef={ref}
      className={clsx(textFieldProps.className, classes.quantity)}
      InputProps={{
        ...InputProps,
        startAdornment: (
          <IconButton
            aria-label='step down'
            size='small'
            edge='start'
            onPointerDown={() => setDirection('down')}
            onPointerUp={stop}
            disabled={textFieldProps.disabled || disabled === 'min'}
            tabIndex='-1'
            color='inherit'
            className={clsx(classes.button, DownProps.className)}
            {...DownProps}
          >
            {DownProps.children ?? (
              <RemoveIcon
                shapeRendering='geometricPrecision'
                titleAccess='Step down'
                fontSize='inherit'
              />
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
            disabled={textFieldProps.disabled || disabled === 'max'}
            tabIndex='-1'
            color='inherit'
            className={clsx(classes.button, UpProps.className)}
            {...UpProps}
          >
            {UpProps.children ?? (
              <AddIcon
                shapeRendering='geometricPrecision'
                titleAccess='Step up'
                fontSize='inherit'
              />
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
