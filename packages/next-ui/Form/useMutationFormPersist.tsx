import { TypedDocumentNode } from '@apollo/client'
import { OperationDefinitionNode } from 'graphql'
import { useEffect } from 'react'
import {
  DeepPartial,
  FieldName,
  FieldValues,
  SetFieldValue,
  useForm,
  UseFormMethods,
} from 'react-hook-form'
import diff from './diff'
import { UseFormOptions, OnCompleteFn, useMutationForm } from './useMutationForm'

/**
 * todo(paales): ability to not store sensitive data like passwords
 */
function useFormPersistBase<TFieldValues extends FieldValues = FieldValues>(
  options: UseFormOptions<TFieldValues>,
  form: Omit<UseFormMethods<TFieldValues>, 'handleSubmit'>,
  name?: string,
) {
  const { watch, setValue } = form
  const { defaultValues } = options

  // Restore changes
  useEffect(() => {
    if (typeof window === 'undefined' || !name) return

    setTimeout(() => {
      try {
        const storedFormStr = window.sessionStorage[name]
        if (!storedFormStr) return

        const storedValues = JSON.parse(storedFormStr) as DeepPartial<TFieldValues>

        if (storedValues) {
          const entries = Object.entries(storedValues) as [
            FieldName<TFieldValues>,
            SetFieldValue<TFieldValues>,
          ][]
          entries.forEach(([key, val]) => setValue(key, val))
        }
      } finally {
        // corrupt data or sessionStorage not available
      }
    }, 500)
  }, [name, setValue])

  // Watch for changes
  useEffect(() => {
    if (typeof window === 'undefined' || !name) return

    setTimeout(() => {
      try {
        const modifiedValues = diff(defaultValues, watch())
        if (modifiedValues) window.sessionStorage[name] = JSON.stringify(modifiedValues)
        else window.sessionStorage.removeItem(name)
      } finally {
        // sessionStorage not available
      }
    }, 500)
  }, [name, defaultValues, watch])

  return form
}

export function useFormPersist<TFieldValues extends FieldValues = FieldValues>(
  name: string,
  options: UseFormOptions<TFieldValues>,
) {
  const form = useForm(options)
  return useFormPersistBase(options, form, `useForm-${name}`) as UseFormMethods<TFieldValues>
}

export function mutationName(document: TypedDocumentNode) {
  const definition = document.definitions.find(
    (d) => d.kind === 'OperationDefinition',
  ) as OperationDefinitionNode

  return `${definition.operation}.${definition.name?.value}`
}

export default function useMutationFormPersist<Q, V>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormOptions<V> & {
    onBeforeSubmit?: (variables: V) => V | Promise<V>
    onComplete?: OnCompleteFn<Q>
  } = {},
) {
  const form = useMutationForm<Q, V>(document, options)
  return useFormPersistBase(options, form, mutationName(document)) as typeof form
}
