import { debounce } from '@material-ui/core'
import { useEffect, useState } from 'react'
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
  const { form, submit, wait = 500, fields } = options
  const { formState } = form
  const [submitting, setSubmitting] = useState(false)
  const values = JSON.stringify(form.watch(fields as string[]))
  const [oldValues, setOldValues] = useState<string>(values)
  const isDirty = values !== oldValues

  const shouldSubmitPrefilledData =
    formState.submitCount === 0 &&
    !isDirty &&
    formState.isValid &&
    !formState.isSubmitting &&
    !formState.isValidating

  const submitDebounced = debounce(async () => {
    setSubmitting(true)
    await submit()
    setOldValues(values)
    setSubmitting(false)
  }, wait)

  useEffect(() => {
    if (
      shouldSubmitPrefilledData ||
      (formState.isDirty &&
        formState.isValid &&
        !formState.isSubmitting &&
        !formState.isValidating &&
        isDirty)
    ) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      submitDebounced()
      return submitDebounced.clear
    }
    return () => {}
  }, [
    formState.isDirty,
    formState.isSubmitting,
    formState.isValid,
    formState.isValidating,
    isDirty,
    shouldSubmitPrefilledData,
    submitDebounced,
  ])

  return submitting
}
