import { MutationHookOptions, TypedDocumentNode, useMutation } from '@apollo/client'
import { useEffect } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import { useFormGql, UseFormGqlMethods, UseFormGraphQlOptions } from './useFormGql'
import { useFormMuiRegister, UseMuiFormRegister } from './useFormMuiRegister'
import { useFormValidFields, UseFormValidReturn } from './useFormValidFields'

export type UseFormGqlMutationReturn<
  Q extends Record<string, any> = Record<string, any>,
  V extends Record<string, any> = Record<string, any>,
> = UseFormGqlMethods<Q, V> &
  UseFormReturn<V> & { muiRegister: UseMuiFormRegister<V>; valid: UseFormValidReturn<V> }

export function isFormGqlOperation<V, Q = Record<string, unknown>>(
  form: UseFormReturn<V>,
): form is UseFormGqlMutationReturn<Q, V> {
  return typeof (form as UseFormGqlMutationReturn<Q, V>).muiRegister === 'function'
}

export function assertFormGqlOperation<V, Q = Record<string, unknown>>(
  form: UseFormReturn<V>,
): asserts form is UseFormGqlMutationReturn<Q, V> {
  if (typeof (form as UseFormGqlMutationReturn<Q, V>).muiRegister !== 'function') {
    throw Error(`form must be one of 'useFromGqlMutation' or 'useFormGqlQuery'`)
  }
}

export function useFormGqlMutation<Q, V>(
  document: TypedDocumentNode<Q, V>,
  options: UseFormGraphQlOptions<Q, V> = {},
  operationOptions?: MutationHookOptions<Q, V>,
): UseFormGqlMutationReturn<Q, V> {
  const form = useForm<V>(options)

  const formGqlOptions = {
    ...options,
    context: {
      headers: {
        'X-ReCaptcha': null,
      },
    },
  }

  useEffect(() => {
    const recaptcha = (window as unknown as any).grecaptcha

    if (!recaptcha) console.warn('useFormGqlMutation: could not find Google ReCaptcha V3 API')

    recaptcha.ready(async () => {
      const result = await recaptcha
        .execute(process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_V3_SITE_KEY, { action: 'submit' })
        .then((token) => {
          formGqlOptions.context.headers['X-ReCaptcha'] = token
        })

      return result
    })
  })

  const tuple = useMutation(document, operationOptions)
  const operation = useFormGql({
    document,
    form,
    tuple,
    ...formGqlOptions,
  })
  const muiRegister = useFormMuiRegister(form)
  const valid = useFormValidFields(form, operation.required)

  return { ...form, ...operation, valid, muiRegister }
}
