import { useEffect } from 'react'
import {
  FieldValues,
  UseFormReturn,
  Path,
  FieldPathValue,
  UnpackNestedValue,
} from 'react-hook-form'

export type UseFormPersistOptions<V> = {
  /** Instance of current form */
  form: UseFormReturn<V>

  /** Name of the key how it will be stored in the storage. */
  name: string

  /**
   * SessionStorage: Will not be avaiable when the user returns later (recommended). localStorage:
   * Will be available when the user returns later.
   */
  storage?: 'sessionStorage' | 'localStorage'

  exclude?: string[]
}

/**
 * Will persist any dirty fields and store it in the sessionStorage/localStorage Will restory any
 * dirty fields when the form is initialized
 */
export function useFormPersist<V>(options: UseFormPersistOptions<V>) {
  const { form, name, storage = 'sessionStorage', exclude = [] } = options
  const { setValue, watch, formState } = form

  const dirtyFieldKeys = Object.keys(formState.dirtyFields) as Path<V>[]
  const valuesJson = JSON.stringify(
    Object.fromEntries(
      dirtyFieldKeys.filter((f) => !exclude.includes(f)).map((field) => [field, watch(field)]),
    ),
  )

  // Restore changes
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      const storedFormStr = window[storage][name] as string
      if (!storedFormStr) return

      const storedValues = JSON.parse(storedFormStr) as FieldValues
      if (storedValues) {
        const entries = Object.entries(storedValues) as [
          Path<V>,
          UnpackNestedValue<FieldPathValue<V, Path<V>>>,
        ][]
        entries.forEach((entry) => setValue(...entry, { shouldDirty: true, shouldValidate: true }))
      }
    } catch {
      //
    }
  }, [name, setValue, storage])

  // Watch for changes
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      if (valuesJson !== '{}') window[storage][name] = valuesJson
      else delete window[storage][name]
    } catch {
      //
    }
  }, [name, storage, valuesJson])
}
