/* eslint-disable react/no-unused-prop-types */
import { cloneDeep } from '@apollo/client/utilities'
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
  UseWatchProps,
  useFormState,
  useWatch,
} from 'react-hook-form'
import { DebounceSettings, useDebounce } from './utils/useDebounce'

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
 *
 *
 * @deprecated Please use the <FormAutoSubmit /> component instead. This method causes excessive rerenders.
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

export type FormAutoSubmitProps<TFieldValues extends FieldValues = FieldValues> = {
  /** Autosubmit only when these field names update */

  /** SubmitHandler */
  // eslint-disable-next-line react/no-unused-prop-types
  submit: ReturnType<UseFormReturn<TFieldValues>['handleSubmit']>

  /**
   * When a current submission is already in flight, should we wait for it to finish before
   * submitting again?
   */
  // eslint-disable-next-line react/no-unused-prop-types
  parallel?: boolean

  noValidate?: boolean

  wait?: number

  /**
   * Only 0 does anthing and will submit immediately. Any other value will be ignored.
   *
   * @deprecated Please use leading instead
   */
  initialWait?: number
} & Omit<UseWatchProps<TFieldValues>, 'defaultValue'> &
  DebounceSettings

export function useAutoSubmitBase<TFieldValues extends FieldValues = FieldValues>(
  props: FormAutoSubmitProps<TFieldValues>,
) {
  const {
    wait = 166,
    initialWait,
    maxWait,
    leading,
    trailing,

    submit,
    parallel,
    noValidate,
    ...watchOptions
  } = props

  // We create a stable object from the values, so that we can compare them later
  const values = useMemoObject(cloneDeep(useWatch(watchOptions)))
  const oldValues = useRef<DeepPartialSkipArrayKey<TFieldValues>>(values)
  const { isValidating, isSubmitting, isValid } = useFormState(watchOptions)

  const submitDebounced = useDebounce(
    async () => {
      try {
        oldValues.current = values
        await submit()
      } catch (e) {
        // We're not interested if the submission actually succeeds, that should be handled by the form itself.
      }
    },
    wait,
    { leading: leading ?? initialWait === 0, maxWait, trailing },
  )

  const valid = (noValidate ? true : isValid) && !isValidating
  const allowed = parallel || !isSubmitting
  const canSubmit = valid && allowed

  if (canSubmit && values !== oldValues.current) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    submitDebounced()
  }
}

/**
 * This is made a components so the useWatch that is used here doesn't retrigger the rerender of the parent component.
 */
function FormAutoSubmitBase<TFieldValues extends FieldValues = FieldValues>(
  props: FormAutoSubmitProps<TFieldValues>,
) {
  useAutoSubmitBase(props)
  return null
}

export const FormAutoSubmit = React.memo(FormAutoSubmitBase) as typeof FormAutoSubmitBase
