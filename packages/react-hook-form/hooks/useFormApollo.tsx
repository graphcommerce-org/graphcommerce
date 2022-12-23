/* eslint-disable import/no-extraneous-dependencies */
import { ApolloError, MutationOptions, QueryOptions, useApolloClient } from '@apollo/client'
import { useMotionValueValue } from '@graphcommerce/framer-utils'
import { isMotionValue, MotionValue, useMotionValue } from 'framer-motion'
import {
  FieldValues,
  FormProvider,
  FormProviderProps,
  SubmitErrorHandler,
  useForm,
  useFormContext,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form'

export type SubmitValidHandler<Q extends Record<string, unknown>, V extends FieldValues> = (
  execute: (variables?: V) => Promise<Q>,
  variables: V,
) => any | Promise<any>

type HandleSubmit<Q extends Record<string, unknown>, V extends FieldValues> = (
  onValid?: SubmitValidHandler<Q, V>,
  onInvalid?: SubmitErrorHandler<V>,
) => (e?: React.BaseSyntheticEvent) => Promise<void>

export type UseFormGqlMutationReturn<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Q extends Record<string, unknown> = Record<string, unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  V extends FieldValues = FieldValues,
> = Omit<UseFormReturn<V>, 'handleSubmit' | 'formState'> & {
  data: MotionValue<Q | null | undefined>
  error: MotionValue<ApolloError | null | undefined>
  handleSubmit: HandleSubmit<Q, V>
}

function isMutation<Q, V>(
  operation: MutationOptions<Q, V> | QueryOptions<V, Q>,
): operation is MutationOptions<Q, V> {
  return (operation as MutationOptions<Q, V>).mutation !== undefined
}

/**
 * `useApolloForm`
 *
 * Example:
 *
 * Without any additional logic
 *
 * ```tsx
 * const form = useFormApollo({
 *   mutation: TestShippingAddressFormDocument,
 * })
 *
 * const onSubmit = form.handleSubmit()
 * ```
 *
 * With additional logic
 *
 * ```tsx
 * const form = useFormApollo({
 *   mutation: TestShippingAddressFormDocument,
 * })
 *
 * const onSubmit = form.handleSubmit(async (execute, variables) => {
 *   // Modify variables before executing
 *   const result = await execute({ ...variables, customerNote: 'joi' })
 *
 *   if (!result.errors) {
 *     // Do something with a successful operation
 *   }
 *
 *   return result
 * })
 * ```
 */
export function useFormApollo<Q extends Record<string, unknown>, V extends FieldValues>(
  operation: QueryOptions<V, Q>,
  useFormProps?: UseFormProps<V>,
  resetOnResult?: (result: Q) => V,
): UseFormGqlMutationReturn<Q, V>
export function useFormApollo<Q extends Record<string, unknown>, V extends FieldValues>(
  operation: MutationOptions<Q, V>,
  useFormProps?: UseFormProps<V>,
  resetOnResult?: (result: Q) => V,
): UseFormGqlMutationReturn<Q, V>
export function useFormApollo<Q extends Record<string, unknown>, V extends FieldValues>(
  operation: MutationOptions<Q, V> | QueryOptions<Partial<V>, Q>,
  useFormProps: UseFormProps<V> = {},
  resetOnResult?: (result: Q) => V,
): UseFormGqlMutationReturn<Q, V> {
  const data = useMotionValue<Q | null | undefined>(undefined)
  const error = useMotionValue<ApolloError | null | undefined>(undefined)
  const client = useApolloClient()
  const form = useForm<V>(useFormProps)

  const defaultHandler: SubmitValidHandler<Q, V> = (execute, variables) => execute(variables)

  return {
    ...form,
    data,
    error,
    handleSubmit: (onValid = defaultHandler, onInvalid = undefined) => {
      const caller = form.handleSubmit(
        (formValues, event) =>
          onValid(async (variables: V = formValues) => {
            error.set(null)

            const result = isMutation(operation)
              ? await client.mutate({ ...operation, variables })
              : await client.query({ ...operation, variables })

            if (!result.data)
              throw Error(
                result.errors
                  ? result.errors[0].message
                  : '[useApolloForm] No data returned from Apollo operation',
              )

            data.set(result.data)
            return result.data
          }, formValues),
        onInvalid,
      )

      return async (e) => {
        try {
          await caller(e)
        } catch (err) {
          data.set(undefined)
          if (err instanceof ApolloError) error.set(err)
          else throw err
        }
      }
    },
  }
}

export function FormProviderApollo<Q extends Record<string, unknown>, V extends FieldValues>(
  props: UseFormGqlMutationReturn<Q, V> & { children: React.ReactNode },
) {
  return <FormProvider {...(props as unknown as FormProviderProps)} />
}

function isFormApollo<Q extends Record<string, unknown>, V extends FieldValues>(
  form: UseFormGqlMutationReturn<Q, V> | UseFormReturn<V>,
): form is UseFormGqlMutationReturn<Q, V> {
  return isMotionValue((form as UseFormGqlMutationReturn<Q, V>).data)
}

export function useFormApolloContext<
  Q extends Record<string, unknown>,
  V extends FieldValues = FieldValues,
>(): UseFormGqlMutationReturn<Q, V> {
  const context = useFormContext()
  if (isFormApollo(context)) {
    return context as unknown as UseFormGqlMutationReturn<Q, V>
  }
  throw new Error('useFormGraphQLContext must be used within a FormProviderGraphQL')
}

export function useFormApolloData<Q extends Record<string, unknown>>(): Q | null | undefined {
  return useMotionValueValue(useFormApolloContext<Q>().data, (res) => res)
}

export function useFormApolloError(): ApolloError | null | undefined {
  return useMotionValueValue(useFormApolloContext().error, (err) => err)
}
