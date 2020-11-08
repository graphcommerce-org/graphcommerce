import { TypedDocumentNode } from '@apollo/client'
import { VariablesOf } from '@graphql-typed-document-node/core'
import { Scalars } from '@reachdigital/magento-graphql'
import {
  DefinitionNode,
  OperationDefinitionNode,
  ValueNode,
  NullValueNode,
  ObjectValueNode,
  ListValueNode,
  VariableNode,
  VariableDefinitionNode,
  TypeNode,
  ListTypeNode,
  NamedTypeNode,
  NonNullTypeNode,
  OperationTypeNode,
} from 'graphql'
import { useMemo } from 'react'
import { LiteralUnion } from 'type-fest'
import type { ObjectToPath } from './ObjectToPath'

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

type OptionalKeys<T> = { [k in keyof T]-?: undefined extends T[k] ? never : k }[keyof T]

type IsRequired<V> = {
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
  [k in keyof V]?: V[k] extends (infer U)[]
    ? string[]
    : V[k] extends Record<string, unknown>
    ? DeepStringify<V[k]>
    : string
}

type FieldTypes = LiteralUnion<keyof Scalars, string> | FieldTypes[]

function variableType<T extends TypeNode>(type: T): FieldTypes {
  if (type.kind === 'ListType') {
    return [variableType((type as ListTypeNode).type)]
  }
  if (type.kind === 'NonNullType') {
    return variableType((type as NonNullTypeNode).type)
  }

  return (type as NamedTypeNode).name.value as keyof Scalars
}

export default function handlerFactory<Q, V>(document: TypedDocumentNode<Q, V>) {
  type Defaults = Partial<Pick<V, OptionalKeys<V>>>
  type Encoding = { [k in keyof V]: FieldTypes }
  type Required = IsRequired<V>
  let requiredPartial: Partial<Required> = {}
  let encodingPartial: Partial<Encoding> = {}
  let defaults: Defaults = {}
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
        defaults = {
          ...defaults,
          [name]: (variable.defaultValue.value as unknown) as Defaults[keyof Defaults],
        }
      }
    })
  })

  const required = requiredPartial as Required
  const encoding = encodingPartial as Encoding

  /**
   * Returns an array of missing fields
   */
  function validate(variables: DeepStringify<V>) {
    return Object.entries(variables)
      .filter(([name]) => !variables[name])
      .map(([name]) => name)
  }

  function heuristicEncode(val: string) {
    if (Number(val).toString() === val) return Number(val)
    if (val === 'true') return true
    if (val === 'false') return false
    return val
  }

  function encodeItem(enc: FieldTypes, val: unknown) {
    if (Array.isArray(enc)) return [encodeItem(enc[0], val)]
    if (val && typeof val === 'object') {
      return Object.fromEntries(Object.entries(val).map(([key, v]) => [key, heuristicEncode(v)]))
    }
    if (enc === 'Boolean') return Boolean(val)
    if (enc === 'Float' || enc === 'Int') return Number(val)
    return val
  }

  function encode(variables: { [k in keyof V]?: DeepStringify<V[k]> }, enc = encoding) {
    return Object.fromEntries(
      Object.entries(variables).map(([key, val]) => {
        return [key, encodeItem(enc[key], val)]
      }),
    ) as V
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  const Field = <P extends {}>(
    props: P & { Component: React.ComponentType<P>; name: ObjectToPath<V> },
  ) => {
    const { Component, name, ...other } = props
    return (
      <Component
        required={required[name as keyof IsRequired<V>]}
        {...((other as unknown) as P)}
        name={name}
      />
    )
  }

  return { type, required, defaults, validate, encode, Field }
}

export function useGqlDocumentHandler<Q, V>(document: TypedDocumentNode<Q, V>) {
  return useMemo(() => handlerFactory<Q, V>(document), [document])
}
