import {
  ApolloClient,
  FetchResult,
  MutationResult,
  NormalizedCache,
  useMutation,
} from '@apollo/client'
import { mergeDeep } from '@apollo/client/utilities'
import {
  DefinitionNode,
  OperationDefinitionNode,
  ValueNode,
  NullValueNode,
  ObjectValueNode,
  ListValueNode,
  VariableNode,
  DocumentNode,
  VariableDefinitionNode,
  TypeNode,
} from 'graphql'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { UnpackNestedValue, UseFormOptions } from 'react-hook-form/dist/types/form'
import { DeepPartial } from 'react-hook-form/dist/types/utils'

function isOperationDefinitionNode(
  node: DefinitionNode | OperationDefinitionNode,
): node is OperationDefinitionNode {
  return (node as OperationDefinitionNode).variableDefinitions !== undefined
}

type WithValueNode = Exclude<
  ValueNode,
  NullValueNode | ObjectValueNode | ListValueNode | VariableNode
>
function isWithValueNode(value: ValueNode | WithValueNode): value is WithValueNode {
  return (value as WithValueNode).value !== undefined
}

function getType(type: TypeNode) {
  if (type.kind === 'NonNullType' || type.kind === 'ListType') return getType(type.type)
  return type.name.value
}

type RequiredFields<T> = { [key in keyof T]?: boolean }

function fieldRequirements<T = { [index: string]: unknown }>(gql: DocumentNode) {
  const variables: Partial<T> = {}
  const required: RequiredFields<T> = {}

  gql.definitions.forEach((definition) => {
    if (isOperationDefinitionNode(definition) && Array.isArray(definition.variableDefinitions)) {
      definition.variableDefinitions.forEach((variable: VariableDefinitionNode) => {
        const name = variable.variable.name.value as keyof T

        if (variable.defaultValue && isWithValueNode(variable.defaultValue)) {
          variables[name] = (variable.defaultValue.value as unknown) as T[keyof T] | undefined
        } else {
          variables[name] = undefined
        }

        if (variable.type.kind === 'NonNullType') required[name] = true
      })
    }
  })

  return [variables, required] as const
}

export type OnCompleteFn<TData> = (
  data: FetchResult<TData>,
  client: ApolloClient<NormalizedCache>,
) => void | Promise<void>

export type BeforeSubmitFn<TVariables> = (variables: TVariables) => TVariables | Promise<TVariables>

type UseMutationForm<TData, TVariables = { [index: string]: unknown }> = {
  mutation: DocumentNode
  values?: UnpackNestedValue<DeepPartial<TVariables>>
  onBeforeSubmit?: BeforeSubmitFn<TVariables>
  onComplete?: OnCompleteFn<TData>
} & Omit<UseFormOptions<TVariables>, 'defaultValues'>

/**
 * Combines useMutation with react-hook-form:
 *
 * - Automatically extracts all required arguments for a query
 * - Casts Float/Int mutation input variables to a Number
 * - Updates the form when the query updates
 */
export function useMutationForm<TData, TVariables = { [index: string]: unknown }>({
  mutation,
  values,
  onComplete,
  onBeforeSubmit: beforeSubmit,
  ...useFormProps
}: UseMutationForm<TData, TVariables>) {
  const [defaultValues, required] = fieldRequirements<TVariables>(mutation)
  const [submit, result] = useMutation<TData, TVariables>(mutation, { errorPolicy: 'all' })
  const [loading, setLoading] = useState<boolean>(false)

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { register, errors, handleSubmit, reset, watch, control } = useForm<TVariables>({
    defaultValues: mergeDeep(defaultValues, values),
    ...useFormProps,
  })

  const valuesJson = JSON.stringify(values || '{}')
  useEffect(() => {
    if (valuesJson) {
      const changeValues = JSON.parse(valuesJson) as UnpackNestedValue<DeepPartial<TVariables>>
      reset(changeValues, { dirtyFields: true })
    }
  }, [valuesJson, reset])

  const onSubmit = handleSubmit(async (formValues) => {
    setLoading(true)
    let variables = { ...values } as TVariables
    if (beforeSubmit) variables = await beforeSubmit(variables)

    mutation.definitions.forEach((definition) => {
      if (isOperationDefinitionNode(definition) && Array.isArray(definition.variableDefinitions)) {
        definition.variableDefinitions.forEach((variable: VariableDefinitionNode) => {
          const name = variable.variable.name.value
          const type = getType(variable.type)
          if (formValues[name]) {
            variables[name] = ['Float', 'Int'].includes(type)
              ? Number(formValues[name])
              : formValues[name]
          }
        })
      }
    })

    const missingFields = Object.keys(required).filter((x) => variables[x] === undefined)
    if (missingFields.length) throw new Error(`Missing fields in form ${missingFields.join(', ')}`)

    const queryResult = await submit({ variables })

    // todo add field specific error handling to form fields.

    if (onComplete && queryResult.data)
      await onComplete(queryResult, result.client as ApolloClient<NormalizedCache>)

    setLoading(false)
  })

  return {
    required,
    register,
    errors,
    onSubmit,
    watch,
    control,
    ...result,
    loading: loading || result.loading,
  }
}

export const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const phonePattern = /([(+]*[0-9]+[()+. -]*)/
