import { TypedDocumentNode } from '@apollo/client'
import { mergeDeep } from '@apollo/client/utilities'
import { DocumentNode } from 'graphql'
import { useState, useEffect } from 'react'
import { FieldValues, useForm, UseFormMethods } from 'react-hook-form'
import diff from './diff'
import { UseFormOptions, OnCompleteFn, useMutationForm } from '.'

function useDocumentHash(document: DocumentNode) {
  const [hash, setHash] = useState<string>()

  useEffect(() => {
    const string = JSON.stringify(document).replace(/\s+/g, '')
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      const hashBuffer = await window.crypto.subtle.digest('SHA-1', Buffer.from(string, 'binary'))
      const hashArray = Array.from(new Uint8Array(hashBuffer)) // convert buffer to byte array
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('') // convert bytes to hex string
      setHash(hashHex)
    })()
  }, [document])

  return hash
}

/**
 * todo(paales): ability to not store sensitive data like passwords
 */
function useFormPersistBase<TFieldValues extends FieldValues = FieldValues>(
  options: UseFormOptions<TFieldValues>,
  form: Omit<UseFormMethods<TFieldValues>, 'handleSubmit'>,
  name?: string,
) {
  const { watch, reset } = form
  const { defaultValues } = options

  // Restore changes
  type ChangeValues = typeof options.defaultValues
  const valuesJson = JSON.stringify(options.defaultValues || '{}')
  useEffect(() => {
    if (typeof window === 'undefined' || !name) return

    try {
      const storedFormStr = window.sessionStorage[name]
      if (!storedFormStr) return

      const changeValues = JSON.parse(valuesJson) as ChangeValues
      // todo(paales): Should make the form dirty, use setValue(field, val) instead of reset?
      reset(mergeDeep(changeValues, JSON.parse(storedFormStr)))
    } finally {
      // corrupt data or sessionStorage not available
    }
  }, [name, valuesJson, reset])

  // Watch for changes
  useEffect(() => {
    if (typeof window === 'undefined' || !name) return

    try {
      const modifiedValues = diff(defaultValues, watch())
      if (modifiedValues) window.sessionStorage[name] = JSON.stringify(modifiedValues)
      else window.sessionStorage.removeItem(name)
    } finally {
      // sessionStorage not available
    }
  }, [name, defaultValues, watch])

  return form
}

export function useFormPersist<TFieldValues extends FieldValues = FieldValues>(
  name: string,
  options: UseFormOptions<TFieldValues>,
) {
  const form = useForm(options)
  return useFormPersistBase(options, form, name) as UseFormMethods<TFieldValues>
}

export default function useMutationFormPersist<Q, V>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormOptions<V> & {
    onBeforeSubmit?: (variables: V) => V | Promise<V>
    onComplete?: OnCompleteFn<Q>
  } = {},
) {
  const form = useMutationForm<Q, V>(document, options)
  // Retrieve stored data
  const name = useDocumentHash(document)

  return useFormPersistBase(options, form, name) as typeof form
}
