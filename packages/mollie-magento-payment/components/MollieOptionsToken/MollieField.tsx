import { InputBaseComponentProps, TextField, TextFieldProps } from '@mui/material'
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { ComponentEventHandler, ComponentFieldState, MollieFieldName } from '../../Mollie'
import { useMollieContext } from './mollieContext'

type MollieFieldContext = [ComponentFieldState, Dispatch<SetStateAction<ComponentFieldState>>]
const mollieFieldContext = React.createContext(undefined as unknown as MollieFieldContext)

function InputComponent(props) {
  const { component, inputRef, ...other } = props
  const Component = component as typeof IframeField
  return <Component {...other} ref={inputRef} />
}

type IframeFieldProps = Omit<InputBaseComponentProps, 'onChange'> & {
  name: MollieFieldName
  onChange: (event: { target: { name: string; value: string } }) => void
}

const IframeField = React.forwardRef<HTMLInputElement, IframeFieldProps>((props, forwardedRef) => {
  const { name, onChange, onFocus, onBlur, ...otherProps } = props
  const internalRef = useRef<HTMLDivElement>(null)
  const forkRef = forwardedRef
  const mollie = useMollieContext()
  const mollieComponent = mollie?.[name]
  const [state, setState] = useContext(mollieFieldContext)

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
      setState((current) => (JSON.stringify(current) === JSON.stringify(e) ? current : e))
    }

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
  isSubmitted?: boolean
} & TextFieldProps

export function MollieField(props: MollieFieldProps) {
  const { isSubmitted = false, label, ...fieldProps } = props

  const [state, setState] = useState<ComponentFieldState>({
    dirty: false,
    touched: false,
    error: undefined,
    valid: false,
  })

  return (
    <mollieFieldContext.Provider value={useMemo(() => [state, setState], [state])}>
      <TextField
        {...fieldProps}
        label={label}
        error={isSubmitted && (!!state.error || !state.valid)}
        helperText={isSubmitted && (state.error || (!state.valid && `${label} cannot be empty`))}
        slotProps={{
          input: {
            inputComponent: InputComponent,
            inputProps: { component: IframeField },
          },
          inputLabel: {
            sx: (theme) => ({
              background: theme.vars.palette.secondary.light,
              ...theme.applyStyles('dark', {
                background: theme.vars.palette.background.paper,
              }),
            }),
            shrink: true,
          },
        }}
      />
    </mollieFieldContext.Provider>
  )
}
