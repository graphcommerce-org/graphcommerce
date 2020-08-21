import {
  TextField,
  TextFieldProps,
  makeStyles,
  Theme,
  createStyles,
  IconButton,
  IconButtonProps,
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import clsx from 'clsx'
import { UseStyles } from 'components/Theme'
import { useRef, RefObject, useState, useEffect, ChangeEvent } from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    quantity: {
      width: 130,
    },
    quantityInput: {
      textAlign: 'center',
      '&::-webkit-inner-spin-button,&::-webkit-outer-spin-button': {
        appearance: 'none',
      },
    },
  }),
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

  useEffect(() => {
    const down = () => {
      ref.current?.stepDown()
      ref.current?.dispatchEvent(new Event('change', { bubbles: true }))
    }
    const up = () => {
      ref.current?.stepUp()
      ref.current?.dispatchEvent(new Event('change', { bubbles: true }))
    }

    if (direction === 'up') {
      up()
      setTimeout(() => setDirection((old) => (old === 'up' ? 'runUp' : null)), 500)
    }
    if (direction === 'runUp') {
      const clear = setInterval(up, 50)
      return () => clearInterval(clear)
    }

    if (direction === 'down') {
      down()
      setTimeout(() => setDirection((old) => (old === 'down' ? 'runDown' : null)), 500)
    }
    if (direction === 'runDown') {
      const clear = setInterval(down, 50)
      return () => clearInterval(clear)
    }

    return () => {}
  }, [direction, ref])

  const updateDisabled = (target: HTMLInputElement) => {
    if (target.value === target.min) setDisabled('min')
    else if (target.value === target.max) setDisabled('max')
    else setDisabled(null)
  }
  useEffect(() => {
    setTimeout(() => ref.current && updateDisabled(ref.current))
  }, [ref])

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
            onPointerDown={() => setDirection('down')}
            onPointerUp={() => setDirection(null)}
            disabled={textFieldProps.disabled || disabled === 'min'}
            tabIndex='-1'
            {...DownProps}
          >
            {DownProps.children ?? <RemoveIcon />}
          </IconButton>
        ),
        endAdornment: (
          <IconButton
            aria-label='step up'
            size='small'
            onPointerDown={() => setDirection('up')}
            onPointerUp={() => setDirection(null)}
            disabled={textFieldProps.disabled || disabled === 'max'}
            tabIndex='-1'
            {...UpProps}
          >
            {UpProps.children ?? <AddIcon />}
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
