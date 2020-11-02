import {
  DocumentNode,
  LazyQueryHookOptions,
  TypedDocumentNode,
  useApolloClient,
  useLazyQuery,
} from '@apollo/client'
import { mergeDeep } from '@apollo/client/utilities'
import { ResultOf, VariablesOf } from '@graphql-typed-document-node/core'
import { useEffect } from 'react'
import { DeepPartial, UnpackNestedValue, useForm, UseFormOptions } from 'react-hook-form'
import handlerFactory from './handlerFactory'

export default function useQueryForm<Q, V>(
  query: TypedDocumentNode<Q, V>,
  { variables, ...queryOptions }: LazyQueryHookOptions<Q, V>,
  useFormOptions: Omit<UseFormOptions<V>, 'defaultValues'>,
) {
  const client = useApolloClient()

  const { Field, defaults, required, encode, validate } = handlerFactory(query)

  const defaultValues = mergeDeep(defaults, variables) as UnpackNestedValue<DeepPartial<V>>

  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    register,
    errors,
    handleSubmit: handleSubmitInternally,
    reset,
    watch,
    control,
    formState,
  } = useForm<V>({
    defaultValues,
    ...useFormOptions,
  })

  const handleSubmit = handleSubmitInternally(async (formValues, onInvalid) => {
    setLoading(true)
    let variables = { ...values } as V
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

    if (onComplete && queryResult.data) await onComplete(queryResult, result.client)

    setLoading(false)
  })

  // const variablesJson = JSON.stringify(variables || '{}')
  // useEffect(() => {
  //   if (variablesJson) {
  //     const changeValues = JSON.parse(variablesJson)
  //     reset(changeValues, { dirtyFields: true })
  //   }
  // }, [variablesJson, reset])

  const bla = useLazyQuery(query)
}

export function useMutationForm<TMutation extends TypedDocumentNode>(mutation: TMutation) {}
