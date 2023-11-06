import { cloneDeep, mergeDeep } from '@apollo/client/utilities'
// eslint-disable-next-line import/no-extraneous-dependencies
import { useMemoObject } from '@graphcommerce/next-ui/hooks/useMemoObject'
// eslint-disable-next-line import/no-extraneous-dependencies
import { debounce } from '@mui/material'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  DeepPartialSkipArrayKey,
  FieldPath,
  FieldValues,
  UseFormReturn,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form'
import { DebounceOptions } from './utils/debounce'
import { useDebouncedCallback } from './utils/useDebounceCallback'

export type UseFormAutoSubmitOptions<TForm extends UseFormReturn<V>, V extends FieldValues> = {
  /** Instance of current form */
  form: Omit<TForm, 'handleSubmit'>
  /** SubmitHandler */
  submit: ReturnType<TForm['handleSubmit']>
  /** Milliseconds to wait before updating */
  wait?: number
  /** Autosubmit only when these field names update */
  fields?: FieldPath<V>[]

  /**
   * Forces the form to submit directly when it is valid, whithout user interaction. Please be aware
   * that this may cause extra requests
   */
  forceInitialSubmit?: boolean
  /** Disables the hook */
  disabled?: boolean
}

/**
 * Make sure the form is set to { mode: 'onChange' }
 *
 * The form will automatically submit when:
 *
 * - The form is dirty (has modifications)
 * - The form is valid (has no errors)
 * - The form is not already submitting
 * - The form is not currently validating
 *
 * Q: The form keeps submitting in loops: A: formState.isDirty should be false after submission Make
 * sure that you call `reset(getValues())` after submission.
 *
 * @see useFormGqlMutation.tsx for an example implementation
 *
 * Q: How to I resubmit if the form is modified during the request?
 *    formState.isDirty should be true after the submission
 * @see useFormGqlMutation.tsx for an example implementation
 */
export function useFormAutoSubmit<
  Form extends UseFormReturn<V>,
  V extends FieldValues = FieldValues,
>(options: UseFormAutoSubmitOptions<Form, V>) {
  const { form, submit, wait = 500, fields, forceInitialSubmit, disabled } = options
  const { formState } = form

  const [submitting, setSubmitting] = useState(false)
  const values = JSON.stringify(fields ? form.watch(fields) : form.watch())
  const [oldValues, setOldValues] = useState<string>(values)

  const canSubmit = formState.isValid && !formState.isSubmitting && !formState.isValidating
  const force = formState.submitCount === 0 && forceInitialSubmit
  const shouldSubmit = formState.isDirty && values !== oldValues

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const submitDebounced = useCallback(
    debounce(async () => {
      setSubmitting(true)

      try {
        await submit()
      } catch (e) {
        // We're not interested if the submission actually succeeds, that should be handled by the form itself.
      }

      setOldValues(values)
      setSubmitting(false)
    }, wait),
    [submit],
  )

  useEffect(() => {
    if (!disabled && canSubmit && (force || shouldSubmit)) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      submitDebounced()
      return () => submitDebounced.clear()
    }
    return () => {}
  }, [canSubmit, force, shouldSubmit, submitDebounced, disabled])

  return submitting
}

export type FormAutoSubmitProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldNames extends readonly FieldPath<TFieldValues>[] = readonly FieldPath<TFieldValues>[],
> = {
  // eslint-disable-next-line react/no-unused-prop-types
  // control: Control<TFieldValues>
  /** Autosubmit only when these field names update */
  // eslint-disable-next-line react/no-unused-prop-types
  name?: readonly [...TFieldNames]

  // eslint-disable-next-line react/no-unused-prop-types
  disabled?: boolean

  // eslint-disable-next-line react/no-unused-prop-types
  exact?: boolean

  /** SubmitHandler */
  // eslint-disable-next-line react/no-unused-prop-types
  // submit: ReturnType<UseFormReturn<TFieldValues>['handleSubmit']>

  /**
   * When a current submission is already in flight, should we wait for it to finish before
   * submitting again?
   */
  // eslint-disable-next-line react/no-unused-prop-types
  parallel?: boolean
} & DebounceOptions

function useFormAutoSubmit2<
  TFieldValues extends FieldValues = FieldValues,
  TFieldNames extends readonly FieldPath<TFieldValues>[] = readonly FieldPath<TFieldValues>[],
>(props: FormAutoSubmitProps<TFieldValues, TFieldNames>) {
  const { wait, initialWait, maxWait, parallel } = props
  const { control, handleSubmit } = useFormContext<TFieldValues>()

  // We create a stable object from the values, so that we can compare them later
  const values = useMemoObject(cloneDeep(useWatch({ control })))
  const oldValues = useRef<DeepPartialSkipArrayKey<TFieldValues>>(values)
  const { isValidating, isSubmitting, isValid } = useFormState({ control })

  const submitDebounced = useDebouncedCallback(
    async () => {
      try {
        oldValues.current = values
        await handleSubmit(() => {})()
      } catch (e) {
        // We're not interested if the submission actually succeeds, that should be handled by the form itself.
      }
    },
    { wait, initialWait, maxWait },
  )

  const valid = isValid && !isValidating
  const allowed = parallel || !isSubmitting
  const canSubmit = valid && allowed

  if (canSubmit && values !== oldValues.current) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    submitDebounced()
  }
}

/**
 * We're wrapping this in a component so that the parent component doesn't rerender on every
 * submission.
 */
function FormAutoSubmitBase<
  TFieldValues extends FieldValues = FieldValues,
  TFieldNames extends readonly FieldPath<TFieldValues>[] = readonly FieldPath<TFieldValues>[],
>(props: FormAutoSubmitProps<TFieldValues, TFieldNames>) {
  const methods = useFormContext<TFieldValues>()
  useFormAutoSubmit2(mergeDeep(props, methods))
  return null
}

export const FormAutoSubmit = React.memo(FormAutoSubmitBase) as typeof FormAutoSubmitBase
