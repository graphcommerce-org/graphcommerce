import { debounce } from '@material-ui/core'
import { useCallback, useEffect, useState } from 'react'
import { FieldValues, UseFormMethods } from 'react-hook-form'

export type UseFormAutoSubmitOptions<TForm extends UseFormMethods<V>, V extends FieldValues> = {
  /** Instance of current form */
  form: Omit<TForm, 'handleSubmit'>
  /** SubmitHandler */
  submit: ReturnType<TForm['handleSubmit']>
  /** Milliseconds to wait before updating */
  wait?: number
  /** Autosubmit only when these field names update */
  fields?: Array<keyof Partial<V>>

  /**
   * Different modes:
   *
   * - `onMount`: Submit the form when it is mounted and valid
   * - `onChange` (default): Submit the form after it has been changed
   * - Todo: `onSubmitted`: Submit the form after it has been manually submitted for the first time
   */
  mode?: 'onMount' | 'onChange' // | 'onSubmitted'
}

/**
 * Make sure the form is set to { mode: 'onChange' }
 *
 * The form will automatically submit when:
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
export default function useFormAutoSubmit<Form extends UseFormMethods<V>, V = FieldValues>(
  options: UseFormAutoSubmitOptions<Form, V>,
) {
  const { form, submit, wait = 500, fields, mode = 'onChange' } = options
  const { formState } = form
  const [submitting, setSubmitting] = useState(false)
  const values = JSON.stringify(form.watch(fields as string[]))
  const [oldValues, setOldValues] = useState<string>(mode === 'onMount' ? '' : values)
  const isDirty = values !== oldValues || (mode !== 'onMount' && formState.isDirty)

  const doSubmit = useCallback(async () => {
    setSubmitting(true)
    await submit()
    setOldValues(values)
    setSubmitting(false)
  }, [submit, values])

  const submitDebounced = debounce(doSubmit, wait)

  useEffect(() => {
    if (formState.isValid && !formState.isSubmitting && !formState.isValidating && isDirty) {
      if (!formState.isSubmitted) {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        doSubmit()
      }
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      submitDebounced()
      return submitDebounced.clear
    }
    return () => {}
  }, [
    doSubmit,
    formState.isSubmitted,
    formState.isSubmitting,
    formState.isValid,
    formState.isValidating,
    isDirty,
    submitDebounced,
  ])

  return submitting
}
