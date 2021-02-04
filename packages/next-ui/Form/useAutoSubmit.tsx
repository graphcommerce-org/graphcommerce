import { debounce } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { FieldValues, UseFormMethods } from 'react-hook-form'

export type UseAutoSubmitOptions<TForm extends UseFormMethods<V>, V extends FieldValues> = {
  /**
   * Instance of current form
   */
  form: Omit<TForm, 'handleSubmit'>
  /**
   * submitHandler
   */
  submitHandler: ReturnType<TForm['handleSubmit']>
  wait?: number
}

/**
 * The form will automatically submit when:
 * - The form is dirty (has modifications)
 * - The form is valid (has no errors)
 * - The form is not already submitting
 * - The form is not currently validating
 *
 * Q: The form keeps submitting in loops:
 * A: formState.isDirty should be false after submission
 * A: Make sure that you call `reset(getValues())` after submission.
 * A: @see useMutationForm.tsx for an example implementation
 *
 * Q: How to I resubmit if the form is modified during the request?
 * A: formState.isDirty should be true after the submission
 * A: @see useMutationForm.tsx for an example implementation
 */
export default function useAutoSubmit<TForm extends UseFormMethods<V>, V = FieldValues>(
  options: UseAutoSubmitOptions<TForm, V>,
) {
  const { form, submitHandler, wait = 500 } = options
  const { formState } = form
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (
      !formState.isDirty ||
      !formState.isValid ||
      formState.isSubmitting ||
      formState.isValidating
    ) {
      return () => {}
    }

    const submit = debounce(async () => {
      setSubmitting(true)
      await submitHandler()
      setSubmitting(false)
    }, wait)

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    submit()

    return submit.clear
  }, [
    formState.isDirty,
    formState.isSubmitting,
    formState.isValid,
    formState.isValidating,
    submitHandler,
    wait,
  ])

  return submitting
}
