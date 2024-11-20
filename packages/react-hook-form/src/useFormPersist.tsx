import { useMemoObject } from '@graphcommerce/next-ui/hooks/useMemoObject'
import { useEffect } from 'react'
import type { FieldValues, UseFormReturn, Path, FieldPath, PathValue } from 'react-hook-form'
import { useWatch, useFormState } from 'react-hook-form'

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
 *
 * @deprecated Please use the FormPersist component instead. This method causes INP problems.
 */
export function useFormPersist<V extends FieldValues>(options: UseFormPersistOptions<V>) {
  const { form, name, storage = 'sessionStorage', exclude = [], persist = [] } = options
  const { setValue, control } = form

  const formState = useFormState({ control })
  const allFields = useWatch({ control })

  const dirtyFieldKeys = Object.keys(formState.dirtyFields) as Path<V>[]

  // // Get all dirty field values and exclude sensitive data
  const newValues = Object.fromEntries(
    dirtyFieldKeys.filter((f) => !exclude.includes(f)).map((field) => [field, allFields[field]]),
  )

  // Amend the values with the values that should always be persisted
  persist.forEach((persistKey) => {
    const value = allFields[persistKey]
    if (value) newValues[persistKey] = value
  })

  // const valuesJson = useMemoObject(newValues)
  const valuesJson = JSON.stringify(newValues)

  // Restore changes
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return
      const storedFormStr = window[storage][name] as string
      if (!storedFormStr) return

      const storedValues = JSON.parse(storedFormStr) as FieldValues
      if (storedValues) {
        const entries = Object.entries(storedValues) as [Path<V>, PathValue<V, Path<V>>][]
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

/**
 * Please make sure to always include this component at the end of your form because of useWatch rules: https://react-hook-form.com/docs/usewatch
 */
export function FormPersist<V extends FieldValues>(props: UseFormPersistOptions<V>) {
  useFormPersist(props)
  return null
}
