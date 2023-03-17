import { useEffect } from 'react'
import { FieldValues, UseFormReturn, Path, FieldPathValue, FieldPath } from 'react-hook-form'

export type UseFormPersistOptions<
  TFieldValues extends FieldValues = FieldValues,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TContext = any,
> = {
  /** Instance of current form, used to watch value */
  form: UseFormReturn<TFieldValues, TContext>

  /** Name of the key how it will be stored in the storage. */
  name: string

  /**
   * - `sessionStorage`: Will not be avaiable when the user returns later (recommended).
   * - `localStorage`: Will be available when the user returns later.
   */
  storage?: 'sessionStorage' | 'localStorage'

  /** Exclude sensitive data from the storage like passwords. */
  exclude?: FieldPath<TFieldValues>[]

  persist?: FieldPath<TFieldValues>[]
}

/**
 * Will persist any dirty fields and store it in the sessionStorage/localStorage Will restory any
 * dirty fields when the form is initialized
 *
 * Todo: Use wath callback so it won't trigger a rerender
 */
export function useFormPersist<V extends FieldValues>(options: UseFormPersistOptions<V>) {
  const { form, name, storage = 'sessionStorage', exclude = [], persist = [] } = options
  const { setValue, watch, formState } = form

  const dirtyFieldKeys = Object.keys(formState.dirtyFields) as Path<V>[]

  // Get all dirty field values and exclude sensitive data
  const newValues = Object.fromEntries(
    dirtyFieldKeys.filter((f) => !exclude.includes(f)).map((field) => [field, watch(field)]),
  )

  // Amend the values with the values that should always be persisted
  persist.forEach((persistKey) => {
    const value = watch(persistKey)
    if (value) newValues[persistKey] = value
  })

  const valuesJson = JSON.stringify(newValues)

  // Restore changes
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      const storedFormStr = window[storage][name] as string
      if (!storedFormStr) return

      const storedValues = JSON.parse(storedFormStr) as FieldValues
      if (storedValues) {
        const entries = Object.entries(storedValues) as [Path<V>, FieldPathValue<V, Path<V>>][]
        entries.forEach(([entryName, value]) =>
          setValue(entryName, value, {
            shouldDirty: true,
            shouldValidate: true,
          }),
        )
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
