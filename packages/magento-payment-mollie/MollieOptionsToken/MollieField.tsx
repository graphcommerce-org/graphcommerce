import {
  InputBaseComponentProps,
  makeStyles,
  TextField,
  TextFieldProps,
  Theme,
} from '@material-ui/core'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { Controller, UseFormReturn } from '../../react-hook-form'
import {
  ComponentEventHandler,
  ComponentFieldState,
  ComponentHandler,
  MollieFieldName,
} from '../Mollie'
import { useMollieContext } from './MollieCreditCardOptions'

interface InputElement {
  focus(): void
  value?: string
}

type MollieFieldContext = [ComponentFieldState, Dispatch<SetStateAction<ComponentFieldState>>]
const mollieFieldContext = React.createContext(undefined as unknown as MollieFieldContext)

const InputComponent = (props, ref) => {
  const { component, inputRef, ...other } = props

  const Component = component as typeof DivComponent
  React.useImperativeHandle(inputRef, () => {
    const handle: InputElement = {
      focus: () => {
        console.log('asdfaaaa')
        // logic to focus the rendered component from 3rd party belongs here
      },
      // hiding the value e.g. react-stripe-elements
    }
    return handle
  })

  return <Component {...other} ref={inputRef} />
}

type DivComponentProps = Omit<InputBaseComponentProps, 'onChange'> & {
  name: MollieFieldName
  onChange: (event: { target: { name: string; value: string } }) => void
}

const DivComponent = React.forwardRef<any, DivComponentProps>((props, forwardedRef) => {
  const { name, onChange, onFocus, onBlur, ...otherProps } = props
  const internalRef = useRef<HTMLDivElement>(null)
  const forkRef = forwardedRef
  const mollie = useMollieContext()
  const mollieComponent = mollie?.[name]
  const [state, setState] = React.useContext(mollieFieldContext)

  const prevFocus = useRef<boolean>(false)

  /** Mount the instance to a dom element */
  useEffect(() => {
    if (!internalRef.current) return () => {}
    mollieComponent?.mount(internalRef.current)
    return () => mollieComponent?.unmount()
  }, [mollieComponent])

  useEffect(() => {
    if (!mollieComponent) return () => {}
    const handleChange: ComponentEventHandler = (e) => {
      onChange({ target: { name, value: e.error ? '' : '1' } })
      setState(e)
    }

    // console.log('trigggerr')
    mollieComponent.addEventListener('change', handleChange)
    return () => {
      try {
        mollieComponent?.removeEventListener(handleChange)
      } catch {
        // console.log('can not clean eventListener')
        // We don't care if this fails
      }
    }
  }, [mollieComponent, name, onChange, setState])

  /** Custom focus handling, because the event is not exposed */
  useEffect(() => {
    if (!internalRef.current) return () => {}

    const mo = new MutationObserver((nodes) => {
      nodes.forEach((node) => {
        if (node.target instanceof HTMLElement) {
          const focus = node.target.classList.contains('has-focus')

          if (focus && prevFocus.current !== focus) onFocus?.(new FocusEvent('focus'))
          if (!focus && prevFocus.current !== focus) onBlur?.(new FocusEvent('blur'))
          prevFocus.current = focus
        }
      })
    })

    mo.observe(internalRef.current, {
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => mo.disconnect()
  }, [mollieComponent, onBlur, onFocus])

  return (
    <>
      <div {...otherProps} ref={internalRef} />
      <input type='hidden' ref={forkRef} value={state.dirty ? '1' : ''} required name={name} />
    </>
  )
})

type MollieFieldProps = {
  name: MollieFieldName
  form: UseFormReturn<any>
} & TextFieldProps

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    background: '#f7f7f7',
  },
}))

export default function MollieField(props: MollieFieldProps) {
  const { name, form } = props

  const { control, setError, setValue } = form
  const classes = useStyles()
  const [state, setState] = useState<ComponentFieldState>({
    dirty: false,
    touched: false,
    valid: false,
    error: undefined,
  })

  return (
    <mollieFieldContext.Provider value={[state, setState]}>
      {/* <Controller
        name={name}
        control={control}
        render={({
          field: { ref, ...fieldProps },
          fieldState: { error, invalid, isDirty, isTouched },
          formState: { isSubmitted },
        }) => {
          console.log(isDirty) */}
      {/* return ( */}
      <TextField
        {...props}
        // error={!!state.error}
        // helperText={state.error}
        InputProps={{
          inputComponent: InputComponent,
          inputProps: { component: DivComponent },
        }}
        InputLabelProps={{
          shrink: true,
          classes: { root: classes.label },
        }}
      />
      {/* )
        }}
      /> */}
    </mollieFieldContext.Provider>
  )
}
