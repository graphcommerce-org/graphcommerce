import React, { useReducer } from 'react'
import { composedFormContext } from './context'
import { composedFormReducer } from './reducer'

export type ComposedFormProps = { children?: React.ReactNode }

export default function ComposedForm(props: ComposedFormProps) {
  const { children } = props

  const [state, dispatch] = useReducer(composedFormReducer, {
    forms: {},
    formState: {
      isSubmitting: false,
      isSubmitSuccessful: false,
      isSubmitted: false,
      isValid: false,
    },
  })

  return (
    <composedFormContext.Provider value={[state, dispatch]}>
      {children}
    </composedFormContext.Provider>
  )
}
