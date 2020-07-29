import { useMutation } from '@apollo/client'
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
} from 'graphql'
import { useForm, DeepPartial } from 'react-hook-form'

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

type RequiredFields<T> = { [key in keyof T]?: boolean }
function fieldRequirements<T = { [index: string]: unknown }>(
  gql: DocumentNode,
): [Partial<T>, RequiredFields<T>] {
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

  return [variables, required]
}

/**
 * Combines useMutation with react-hook-form:
 *
 * Automatically extracts all required arguments for a queryw
 */
export function useMutationForm<TData, TVariables = Record<string, unknown>>(
  mutation: DocumentNode,
) {
  const [defaultValues, required] = fieldRequirements<TVariables>(mutation)
  const [submit, result] = useMutation<TData, TVariables>(mutation)

  const { register, errors, handleSubmit } = useForm<TVariables>({
    defaultValues: defaultValues as DeepPartial<TVariables>,
  })

  const onSubmit = handleSubmit((variables: TVariables) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    submit({ variables })
  })

  return { required, result, register, errors, onSubmit }
}

export const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const phonePattern = /([(+]*[0-9]+[()+. -]*)/
