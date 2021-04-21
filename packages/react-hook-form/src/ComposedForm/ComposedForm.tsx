import React, { useRef } from 'react'
import { composedFormContext } from './context'
import { ComposedFormContext } from './types'

function useConstant<T>(init: () => T) {
  const ref = useRef<T | null>(null)
  if (ref.current === null) ref.current = init()
  return ref.current
}

export type ComposedFormProps = { children?: React.ReactNode }

export default function ComposedForm(props) {
  const { children } = props
  const forms = useConstant<ComposedFormContext>(() => ({}))
  return <composedFormContext.Provider value={forms}>{children}</composedFormContext.Provider>
}
