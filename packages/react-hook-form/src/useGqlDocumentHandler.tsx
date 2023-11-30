import type { TypedDocumentNode } from '@apollo/client'
import type {
  DefinitionNode,
  OperationDefinitionNode,
  ValueNode,
  NullValueNode,
  ObjectValueNode,
  ListValueNode,
  VariableNode,
  VariableDefinitionNode,
  TypeNode,
  OperationTypeNode,
} from 'graphql'
import { useMemo } from 'react'
import type { FieldValues } from 'react-hook-form'
import type { LiteralUnion } from 'type-fest'

type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

function isOperationDefinition(
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

export type OptionalKeys<T> = { [k in keyof T]-?: undefined extends T[k] ? never : k }[keyof T]

export type IsRequired<V> = {
  [k in keyof V]-?: undefined extends V[k] ? false : true
}

export type DeepIsRequired<V> = {
  [k in keyof V]-?: undefined extends V[k]
    ? false
    : V[k] extends Record<string, unknown>
      ? DeepIsRequired<V[k]>
      : true
}

type DeepStringify<V> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [k in keyof V]?: V[k] extends (infer U)[]
    ? string[]
    : V[k] extends Record<string, unknown>
      ? DeepStringify<V[k]>
      : string
}

type FieldTypes = LiteralUnion<keyof Scalars, string> | FieldTypes[]

function variableType<T extends TypeNode>(type: T): FieldTypes {
  if (type.kind === 'ListType') {
    return [variableType(type.type)]
  }
  if (type.kind === 'NonNullType') {
    return variableType(type.type)
  }

  return type.name.value as keyof Scalars
}

export type UseGqlDocumentHandler<V extends FieldValues> = {
  type: OperationTypeNode | undefined
  required: IsRequired<V>
  defaultVariables: Partial<Pick<V, OptionalKeys<V>>>
  encode: (
    variables: { [k in keyof V]?: DeepStringify<V[k]> },
    enc?: { [k in keyof V]: FieldTypes },
  ) => V
}

function handlerFactory<Q, V extends FieldValues>(
  document: TypedDocumentNode<Q, V>,
): UseGqlDocumentHandler<V> {
  type Defaults = Partial<Pick<V, OptionalKeys<V>>>
  type Encoding = { [k in keyof V]: FieldTypes }
  type Required = IsRequired<V>
  let requiredPartial: Partial<Required> = {}
  let encodingPartial: Partial<Encoding> = {}
  let defaultVariables: Defaults = {}
  let type: OperationTypeNode | undefined

  document.definitions.forEach((definition) => {
    if (!isOperationDefinition(definition)) return
    if (!definition.variableDefinitions) return

    type = definition.operation
    definition.variableDefinitions.forEach((variable: VariableDefinitionNode) => {
      const name = variable.variable.name.value as keyof V

      requiredPartial = { ...requiredPartial, [name]: variable.type.kind === 'NonNullType' }
      encodingPartial = { ...encodingPartial, [name]: variableType(variable.type) }

      if (variable.defaultValue && isWithValueNode(variable.defaultValue)) {
        defaultVariables = {
          ...defaultVariables,
          [name]: variable.defaultValue.value as unknown as Defaults[keyof Defaults],
        }
      }
    })
  })

  const required = requiredPartial as Required
  const encoding = encodingPartial as Encoding

  function encodeItem(enc: FieldTypes, val: unknown) {
    if (Array.isArray(val)) return val.map((v, i) => encodeItem(enc[i], v))
    if (enc === 'Boolean') return Boolean(val)
    if (enc === 'Float' || enc === 'Int') return Number(val)
    return val
  }

  function encode(variables: { [k in keyof V]?: DeepStringify<V[k]> }, enc = encoding) {
    return Object.fromEntries(
      Object.entries(variables).map(([key, val]) => [key, encodeItem(enc[key], val)]),
    ) as V
  }

  return { type, required, defaultVariables, encode }
}

export function useGqlDocumentHandler<Q, V extends FieldValues>(
  document: TypedDocumentNode<Q, V>,
): UseGqlDocumentHandler<V> {
  return useMemo(() => handlerFactory<Q, V>(document), [document])
}
