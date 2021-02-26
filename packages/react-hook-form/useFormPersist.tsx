import { useEffect } from 'react'
import { FieldName, FieldValues, UseFormMethods, SetFieldValue } from 'react-hook-form'

export type UseFormPersistOptions<
  Form extends Pick<UseFormMethods<V>, 'watch' | 'setValue' | 'formState'>,
  V extends FieldValues
> = {
  /** Instance of current form */
  form: Form

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
export default function useFormPersist<
  Form extends Pick<UseFormMethods<V>, 'watch' | 'setValue' | 'formState'>,
  V = FieldValues
>(options: UseFormPersistOptions<Form, V>) {
  const { form, name, storage = 'sessionStorage', exclude = [] } = options
  const { setValue, watch, formState } = form
  const values = watch(Object.keys(formState.dirtyFields).filter((f) => !exclude.includes(f)))

  // Restore changes
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      const storedFormStr = window[storage][name]
      if (!storedFormStr) return

      const storedValues = JSON.parse(storedFormStr) as FieldValues
      if (storedValues) {
        const entries = Object.entries(storedValues) as [FieldName<V>, SetFieldValue<V>][]
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
      if (values) window[storage][name] = JSON.stringify(values)
      else delete window[storage][name]
    } catch {
      //
    }
  }, [name, storage, values])
}
