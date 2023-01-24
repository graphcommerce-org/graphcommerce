import {
  FieldValues,
  useForm,
  UseFormGraphQlOptions,
  UseFormProps,
} from '@graphcommerce/ecommerce-ui'
import { ApolloError, useApolloClient, useQuery } from '@graphcommerce/graphql'
import { useMotionValue } from 'framer-motion'
import { useCallback, useMemo } from 'react'
import {
  AddProductsToCompareListDocument,
  AddProductsToCompareListMutation,
  AddProductsToCompareListMutationVariables,
} from '../graphql/AddProductsToCompareList.gql'
import { CompareListDocument } from '../graphql/CompareList.gql'
import {
  RemoveProductsFromCompareListDocument,
  RemoveProductsFromCompareListMutation,
  RemoveProductsFromCompareListMutationVariables,
} from '../graphql/RemoveProductsFromCompareList.gql'
import { AddProductsToCompareContext, CompareFormFields } from '../hooks/useAddProductsToCompare'
import { useCompareListIdCreate } from '../hooks/useCompareListIdCreate'
import { useFormGqlMutationCompare } from '../hooks/useFormGqlMutationCompare'
import { AddProductsToCompareSnackbar } from './AddProductsToCompareSnackbar'

export type AddProductsToCompareProps = {
  children: React.ReactNode
}

type SubmitValidHandler<Q extends Record<string, unknown>, V extends FieldValues> = (
  execute: (variables?: V) => Promise<Q>,
  variables: V,
) => any | Promise<any>

type HandleSubmit<Q extends Record<string, unknown>, V extends FieldValues> = (
  onValid?: SubmitValidHandler<Q, V>,
  onInvalid?: SubmitErrorHandler<V>,
) => (e?: React.BaseSyntheticEvent) => Promise<void>

export function AddProductsToCompare(props: AddProductsToCompareProps) {
  const { children } = props

  type Q = AddProductsToCompareListMutation | RemoveProductsFromCompareListMutation
  type V =
    | AddProductsToCompareListMutationVariables
    | RemoveProductsFromCompareListMutationVariables

  const data = useMotionValue<Q | null | undefined>(undefined)
  const error = useMotionValue<ApolloError | null | undefined>(undefined)

  const form = useForm<V>()
  const client = useApolloClient()
  const listId = useCompareListIdCreate()

  const defaultHandler: SubmitValidHandler<Q, V> = (execute, variables) => execute(variables)

  const handleSubmit: HandleSubmit<Q, V> = useCallback(
    (onValid = defaultHandler) => {
      const caller = form.handleSubmit((formValues, event) =>
        onValid(async (variables: V = formValues) => {
          error.set(null)

          const result = await client.mutate({
            mutation: AddProductsToCompareListDocument,
            variables: { ...variables, uid: await listId() },
          })

          if (!result.data)
            throw Error(
              result.errors
                ? result.errors[0].message
                : '[useApolloForm] No data returned from Apollo operation',
            )

          data.set(result.data)
          return result.data
        }, formValues),
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
    [client, data, error, form, listId],
  )

  const submit = handleSubmit()

  return (
    <AddProductsToCompareContext.Provider value={useMemo(() => ({ form, submit }), [form, submit])}>
      {children}
      <AddProductsToCompareSnackbar />
    </AddProductsToCompareContext.Provider>
  )
}

