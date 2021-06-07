import { InputBaseComponentProps, TextField } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import {
  ComponentEventListener,
  ComponentFieldState,
  MollieComponentVariants,
  MollieInstance,
} from '../Mollie'

type MollieFieldProps = {
  component: MollieComponentVariants
  mollie?: MollieInstance
}

function InputComponent(props: InputBaseComponentProps) {
  const { component: Component, inputRef, ...other } = props

  console.log('hoi')

  React.useImperativeHandle(inputRef, () => {
    const asfd = {
      focus: () => {
        console.log('asdfaaaa')
        // logic to focus the rendered component from 3rd party belongs here
      },
      // hiding the value e.g. react-stripe-elements
    }
    return asfd
  })

  return <Component {...other} />
}

const DivComponent = React.forwardRef<HTMLDivElement, JSX.IntrinsicElements['div']>(
  (props, ref) => <div {...props} ref={ref} />,
)

export default function MollieField(props: MollieFieldProps) {
  const { mollie, component } = props
  const ref = useRef<HTMLDivElement>(null)

  const [state, setState] = useState<ComponentFieldState>({
    dirty: false,
    touched: false,
    valid: false,
  })

  useEffect(() => {
    if (!mollie) return () => {}

    const instance = mollie.createComponent(component)
    if (ref.current) instance.mount(ref.current)

    instance.addEventListener('change', setState)
    return () => {
      instance.removeEventListener(setState)
      instance.unmount()
    }
  }, [component, mollie])

  return (
    <>
      <TextField
        label={component}
        variant='outlined'
        focused
        error={!!state.error}
        helperText={state.error}
        InputProps={{
          inputComponent: InputComponent,
          inputProps: { component: (ppp) => <div ref={ref} {...ppp} /> },
        }}
      />
    </>
  )
}
