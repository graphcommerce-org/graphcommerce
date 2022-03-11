import React, { useMemo, useReducer } from 'react'
import { composedFormContext } from './context'
import { composedFormReducer } from './reducer'

export type ComposedFormProps = { children?: React.ReactNode }

export function ComposedForm(props: ComposedFormProps) {
  const { children } = props

  const [state, dispatch] = useReducer(composedFormReducer, {
    forms: {},
    isCompleting: false,
    buttonState: {
      isSubmitting: false,
      isSubmitted: false,
      isSubmitSuccessful: false,
    },
    formState: {
      isSubmitting: false,
      isSubmitSuccessful: false,
      isSubmitted: false,
      isValid: false,
    },
    submitted: false,
  })

  return (
    <composedFormContext.Provider value={useMemo(() => [state, dispatch], [state])}>
      {children}
    </composedFormContext.Provider>
  )
}
